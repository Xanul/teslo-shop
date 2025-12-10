import { ProductRepository } from "@/repositories";
import { validatePaginationParams, isValidGender } from "@/utils";
import { Gender, Product } from "@/interfaces";
import { DatabaseError, ValidationError } from "@/lib";

// Interfaces para el service
interface PaginationOptions {
  page?: number;
  take?: number;
  category?: Gender;
}

interface PaginatedResult {
  currentPage: number;
  totalPages: number;
  products: Product[];
}


export class ProductService {
  constructor(private repository: ProductRepository) {}

  private validateSlug(slug: string): void {
    if (!slug || slug.trim() === '') {
      throw new ValidationError("Slug is required", "slug", slug)
    }
  }

  async getPaginatedProducts(
    options: PaginationOptions
  ): Promise<PaginatedResult> {
    // Validar datos de entrada
    const { page, take } = validatePaginationParams(options.page, options.take);
    const { category } = options;

    // Validar categoria
    if (category && !isValidGender(category)) {
      throw new ValidationError("Invalid Category", "category", category);
    }

    try {
      // Calcular el skip para la paginacion
      const skip = (page - 1) * take;

      // Obtener datos del repositorio
      const [rawProducts, totalProducts] = await Promise.all([
        this.repository.findManyWithImages(skip, take, category),
        this.repository.count(category),
      ]);

      // Transformar datos de prisma a interfaz de Product
      const products = rawProducts.map((product) => ({
        ...product,
        images: product.ProductImage.map((img) => img.url),
      }));

      // retornar resultado formateado
      return {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / take),
        products,
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new DatabaseError(
        "Error fetching the products",
        "getPaginatedProducts",
        error
      );
    }
  }

  async getProductBySlug(
    slug: string
  ):Promise<Product | null> {

    // Validar slug
    this.validateSlug(slug);
    
    try {
      const rawProduct = await this.repository.findProductBySlug(slug);
      if (!rawProduct) return null;
      
      const product = {
        ...rawProduct,
        images: rawProduct?.ProductImage.map((img) => img.url)
      }
      return product
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new DatabaseError(
        "Error fetching the product",
        "getProductBySlug",
        error
      )
    }
  }

  async getStockBySlug(
    slug: string
  ):Promise<{inStock: number} | null> {
    // Validar slug
    this.validateSlug(slug);

    try {
      const productStock = await this.repository.findStockBySlug(slug);
      if (!productStock) return null;
      return productStock
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new DatabaseError(
        "Error fetching product stock",
        "getStockBySlug",
        error
      )
    }

  }

}

// Instancia única del servicio (Singleton)
const productRepository = new ProductRepository();
export const productService = new ProductService(productRepository);
