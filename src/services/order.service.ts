import { CART_CONFIG } from "@/config";
import { ProductToOrder, UserAddress } from "@/interfaces";
import { OrderRepository } from "@/repositories";



export class OrderService {
  constructor(private repository: OrderRepository) { }

  /**
   * Crea una nueva orden de compra
   * @param productsToOrder - Productos a ordenar con cantidad y talla
   * @param userId - ID del usuario que realiza la orden
   * @param orderAddress - Dirección de envío
   * @returns La orden creada con todos sus detalles
   */
  async createOrder(
    productsToOrder: ProductToOrder[],
    userId: string,
    orderAddress: UserAddress
  ) {
    // 1. Obtener los productos de la base de datos
    const productIds = productsToOrder.map(p => p.productId);
    const uniqueProductIds = new Set(productIds);
    const products = await this.repository.findProductsByIds(productIds);

    // 2. Validar que todos los productos existan
    if (products.length !== uniqueProductIds.size) {
      throw new Error("Some products were not found");
    }

    // 3. Crear un mapa de productos para acceso rápido
    const productsMap = new Map(products.map(p => [p.id, p]));

    // 4. Validar stock, tallas y calcular totales
    let subTotal = 0;
    const orderItems = productsToOrder.map(item => {
      const product = productsMap.get(item.productId);

      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      // Validar que la talla esté disponible
      if (!product.sizes.includes(item.size)) {
        throw new Error(`Size ${item.size} not available for product ${product.title}`);
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
    const itemsInOrder = productsToOrder.reduce((acc, item) => acc + item.quantity, 0);

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


}

const orderRepository = new OrderRepository();
export const orderService = new OrderService(orderRepository);