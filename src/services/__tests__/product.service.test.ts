import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductService } from "../product.service";
import { ValidationError, DatabaseError } from "@/lib";


// Crear un mock del repository
const mockRepository = {
  findManyWithImages: vi.fn(),
  count: vi.fn()
}

describe("ProductService", () => {

  let service: ProductService;

  beforeEach(() => {
    // Crea una instancia limpia antes de cada test
    service = new ProductService(mockRepository);
    vi.clearAllMocks();
  });

  it("debe lanzar ValidationError para categoria invalida", async () => {
    // Intentar con categoria invalida
    await expect(
      service.getPaginatedProducts({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        category: "INVALID" as any,
      })
    ).rejects.toThrow(ValidationError);
  })

  it("debe retornar productos paginados exitosamente",async () => {
    const mockProducts = [
      {
        id: "1",
        title: "Camiseta",
        price: 29.99,
        ProductImage: [{ url: "img1.jpg" }, { url: "img2.jpg" }],
      },
      {
        id: "2",
        title: "Pantalón",
        price: 49.99,
        ProductImage: [{ url: "img3.jpg" }],
      },
    ]

    mockRepository.findManyWithImages.mockResolvedValue(mockProducts);
    mockRepository.count.mockResolvedValue(25);

    // Llama al servicio
    const result = await service.getPaginatedProducts({
      page: 1,
      take: 12,
      category: "men"
    });

    expect(result.products).toHaveLength(2)
    expect(result.currentPage).toBe(1)
    expect(result.totalPages).toBe(3)

    // Verofocar que transofmo las imagenes correctamente
    expect(result.products[0].images).toEqual(["img1.jpg", "img2.jpg"])
    expect(result.products[1].images).toEqual(["img3.jpg"])

    //Verificar que se llamo al respositorio correctamente
    expect(mockRepository.findManyWithImages).toHaveBeenCalledWith(0, 12, "men");
    expect(mockRepository.count).toHaveBeenCalledWith("men");

  })

  it("debe normalizar parámetros de paginación inválidos", async () => {
    mockRepository.findManyWithImages.mockResolvedValue([]);
    mockRepository.count.mockResolvedValue(0);

    await service.getPaginatedProducts({
      page: -1,    // Inválido
      take: 100,   // Excede máximo
    });

    // Debe normalizar: page=1, take=50
    expect(mockRepository.findManyWithImages).toHaveBeenCalledWith(
      0,   // (1-1) * 50
      50,  // limitado a 50
      undefined
    );
  });

  
  it("debe lanzar DatabaseError si falla el repository", async () => {
    // Simular error de base de datos
    mockRepository.findManyWithImages.mockRejectedValue(
      new Error("Connection timeout")
    );

    await expect(
      service.getPaginatedProducts({ page: 1 })
    ).rejects.toThrow(DatabaseError);
  });

})
