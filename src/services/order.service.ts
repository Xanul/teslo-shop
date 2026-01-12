import { CART_CONFIG } from "@/config";
import { ProductToOrder, UserAddress } from "@/interfaces";
import { OrderRepository } from "@/repositories";
import { OrderStatus, PaymentMethod } from "@prisma/client";

export class OrderService {
  constructor(private repository: OrderRepository) {}

  async createOrder(
    productsToOrder: ProductToOrder[],
    userId: string,
    orderAddress: UserAddress
  ) {
    // 1. Obtener los productos de la base de datos
    const productIds = productsToOrder.map((p) => p.productId);
    const uniqueProductIds = new Set(productIds);
    const products = await this.repository.findProductsByIds(productIds);

    // 2. Validar que todos los productos existan
    if (products.length !== uniqueProductIds.size) {
      throw new Error("Some products were not found");
    }

    // 3. Crear un mapa de productos para acceso rápido
    const productsMap = new Map(products.map((p) => [p.id, p]));

    // 4. Validar stock, tallas y calcular totales
    let subTotal = 0;
    const orderItems = productsToOrder.map((item) => {
      const product = productsMap.get(item.productId);

      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      // Validar que la talla esté disponible
      if (!product.sizes.includes(item.size)) {
        throw new Error(
          `Size ${item.size} not available for product ${product.title}`
        );
      }

      // Validar stock
      if (product.inStock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.title}. Available: ${product.inStock}, requested: ${item.quantity}`
        );
      }

      // Calcular subtotal
      const itemTotal = item.quantity * product.price;
      subTotal += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        price: product.price,
      };
    });

    // 5. Calcular impuestos y totales
    const tax = subTotal * CART_CONFIG.TAX_RATE;
    const total = subTotal + tax;
    const itemsInOrder = productsToOrder.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    // 6. Transformar UserAddress a OrderAddress
    const orderAddressData = {
      firstName: orderAddress.firstName,
      lastName: orderAddress.lastName,
      address: orderAddress.address,
      address2: orderAddress.address2,
      postalCode: orderAddress.postalCode,
      city: orderAddress.city,
      state: orderAddress.state,
      country: orderAddress.country.name,
      phone: orderAddress.phone,
    };

    // 7. Crear la orden en la base de datos
    const order = await this.repository.createOrder({
      userId,
      subTotal,
      tax,
      total,
      itemsInOrder,
      orderItems,
      orderAddress: orderAddressData,
    });

    return order;
  }

  async getOrderById(orderId: string) {
    const order = await this.repository.findOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  async getOrdersByUser(userId: string) {
    const orders = await this.repository.findOrderByUser(userId);

    if (!orders) {
      throw new Error("Orders not found");
    }

    return orders;
  }

  async getAllOrders() {
    return this.repository.findManyOrders();
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.repository.updateOrderStatus(orderId, status);
  }

  async markOrderAsPaid(orderId: string) {
    return this.repository.markOrderAsPaid(orderId);
  }

  async setPaymentMethod(orderId: string, paymentMethod: PaymentMethod) {
    return this.repository.setPaymentMethod(orderId, paymentMethod);
  }
}

const orderRepository = new OrderRepository();
export const orderService = new OrderService(orderRepository);
