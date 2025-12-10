import prisma from "@/lib/prisma";
import { Gender } from "@/interfaces";

export class ProductRepository {
  // Metodo para obtener todos los productos con sus imagenes
  async findManyWithImages(skip: number, take: number, gender?: Gender) {
    
    const where = gender ? { gender } : {};

    return prisma.product.findMany({
      take,
      skip,
      where,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });
  }

  // Metodo para obtener un producto unico por slug
  async findProductBySlug(slug: string) {
    return prisma.product.findFirst({
      where: {
        slug: slug,
      },
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  // TODO: Investigar si es posible optimizar el metodo de findProductBySlug para que mande tambien el stock de forma dinamica
  // TODO: Investigar si es mas conveniente retornar solo el numero 
  // Metodo para obtener el stock de un producto
  async findStockBySlug(slug: string) {
    return prisma.product.findFirst({
      where: {
        slug: slug
      },
      select: {
        inStock: true
      }
    })
  }

  // Metodo para contar todos los productos
  async count(gender?: Gender) {
    const where = gender ? { gender } : {};
    return prisma.product.count({ where });
  }
}
