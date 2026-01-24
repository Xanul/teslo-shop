import prisma from "@/lib/prisma";
import { CreateProduct, Gender } from "@/interfaces";

export class ProductRepository {
  async create(data: CreateProduct) {
    const { images, ...productData } = data;

    // Usar transacción para crear producto e imágenes de forma atómica
    return prisma.$transaction(async (tx) => {
      // 1. Crear el producto
      const product = await tx.product.create({
        data: {
          ...productData,
          // 2. Si hay imágenes, crearlas en la misma transacción
          ...(images &&
            images.length > 0 && {
              ProductImage: {
                create: images.map((url) => ({ url })),
              },
            }),
        },
        // 3. Incluir las imágenes en la respuesta
        include: {
          ProductImage: {
            select: {
              id: true,
              url: true,
            },
          },
          category: true,
        },
      });

      return product;
    });
  }

  async update(id: string, data: Partial<CreateProduct>) {
    const { images, ...productData } = data;

    // Usar transacción para actualizar producto y agregar nuevas imágenes
    return prisma.$transaction(async (tx) => {
      // 1. Actualizar los datos del producto
      const product = await tx.product.update({
        where: { id },
        data: {
          ...productData,
          // 2. Si hay nuevas imágenes, agregarlas
          ...(images &&
            images.length > 0 && {
              ProductImage: {
                create: images.map((url) => ({ url })),
              },
            }),
        },
        // 3. Incluir las imágenes en la respuesta
        include: {
          ProductImage: {
            select: {
              id: true,
              url: true,
            },
          },
          category: true,
        },
      });

      return product;
    });
  }

  async deleteProductImage(imageId: number) {
    return prisma.productImage.delete({
      where: { id: imageId },
    });
  }

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
            id: true,
          },
        },
      },
    });
  }
  // Metodo para obtener el stock de un producto
  async findStockBySlug(slug: string) {
    return prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    });
  }

  // Metodo para contar todos los productos
  async count(gender?: Gender) {
    const where = gender ? { gender } : {};
    return prisma.product.count({ where });
  }

  // Metodo para obtener todas las categorias
  async findAllCategories() {
    return prisma.category.findMany();
  }
}
