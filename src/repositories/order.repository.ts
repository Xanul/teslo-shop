import prisma from "@/lib/prisma";
import { OrderAddress } from "@/interfaces";
import { OrderStatus, Size, PaymentMethod } from "@prisma/client";

interface CreateOrderData {
  userId: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  orderItems: {
    productId: string;
    quantity: number;
    price: number;
    size: Size;
  }[];
  orderAddress: OrderAddress;
}

export class OrderRepository {
  // Obtiene productos por sus Ids
  async findProductsByIds(productIds: string[]) {
    return prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        title: true,
        price: true,
        inStock: true,
        sizes: true,
      },
    });
  }

  async findOrderById(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            size: true,
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        orderAddress: true,
      },
    });
  }

  async findOrderByUser(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            size: true,
            product: {
              select: {
                id: true,
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
        orderAddress: true,
      },
    });
  }

  // TODO: Agregar paginacion
  async findManyOrders() {
    return prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async createOrder(orderData: CreateOrderData) {
    const {
      userId,
      subTotal,
      tax,
      total,
      itemsInOrder,
      orderItems,
      orderAddress,
    } = orderData;
    return prisma.$transaction(async (tx) => {
      // 1. Verificar y actualizar stock de cada producto
      for (const item of orderItems) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { inStock: true, title: true },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }
        if (product.inStock < item.quantity) {
          throw new Error(
            `Insufficient stock for ${product.title}. Available ${product.inStock}`
          );
        }
        await tx.product.update({
          where: { id: item.productId },
          data: { inStock: { decrement: item.quantity } },
        });
      }

      // 2. Crear la orden
      const order = await tx.order.create({
        data: {
          userId,
          subTotal,
          tax,
          total,
          itemsInOrder,
          status: "PENDING",
          isPaid: false,
          orderItems: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              size: item.size,
              price: item.price,
            })),
          },
          orderAddress: {
            create: {
              firstName: orderAddress.firstName,
              lastName: orderAddress.lastName,
              address: orderAddress.address,
              address2: orderAddress.address2,
              postalCode: orderAddress.postalCode,
              city: orderAddress.city,
              state: orderAddress.state,
              country: orderAddress.country,
              phone: orderAddress.phone,
            },
          },
        },
        include: {
          orderItems: {
            select: {
              id: true,
              quantity: true,
              price: true,
              size: true,
              product: {
                select: {
                  title: true,
                  slug: true,
                },
              },
            },
          },
          orderAddress: true,
        },
      });
      return order;
    });
  }

  async setTransactionId(orderId: string, transactionId: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: { transactionId },
    });
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async markOrderAsPaid(orderId: string) {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        status: "PAID",
        paidAt: new Date(),
      },
    });
  }

  async setPaymentMethod(orderId: string, paymentMethod: PaymentMethod) {
    return prisma.order.update({
      where: { id: orderId },
      data: { paymentMethod },
    });
  }
}
