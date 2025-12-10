import { describe, it, expect } from "vitest";
import { isValidGender, validatePaginationParams } from "../validators";  

describe("Validators", () => {

  describe("isValidGender", () => {

    it("debe retornar true para generos validos", () => {
      expect(isValidGender("men")).toBe(true);
      expect(isValidGender("women")).toBe(true);
      expect(isValidGender("kid")).toBe(true);
      expect(isValidGender("unisex")).toBe(true);
    })

    it("debe retornar false para generos invalidos", () => {
      expect(isValidGender("invalid")).toBe(false);
      expect(isValidGender("HACK")).toBe(false);
      expect(isValidGender(123)).toBe(false);
      expect(isValidGender(null)).toBe(false);
      expect(isValidGender(undefined)).toBe(false);
    })

  })

  describe("validatePaginationParams", () => {
    it("debe usar valores por defecto cuando no se pasan parametros", () => {
      const result = validatePaginationParams()
      expect(result.page).toBe(1);
      expect(result.take).toBe(12);
    })

    it("debe normalizar página negativa a 1", () => {
      const result = validatePaginationParams(-5, 12);
      expect(result.page).toBe(1);
    });

    it("debe normalizar página 0 a 1", () => {
      const result = validatePaginationParams(0, 12);
      expect(result.page).toBe(1);
    });

    it("debe limitar take a máximo 50", () => {
      const result = validatePaginationParams(1, 100);
      expect(result.take).toBe(50);
    });

    it("debe aceptar valores válidos", () => {
      const result = validatePaginationParams(3, 20);
      expect(result.page).toBe(3);
      expect(result.take).toBe(20);
    });

  })

})