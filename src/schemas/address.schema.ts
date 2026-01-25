import { z } from "zod";

/**
 * Schema de validación para direcciones de usuario
 *
 * Este schema define las reglas de validación para los formularios de dirección,
 * asegurando la integridad de los datos antes de ser procesados.
 */
export const addressSchema = z.object({
  // Alias de la dirección (ej: "Casa", "Trabajo", "Oficina")
  alias: z
    .string()
    .min(2, "The alias must have at least 2 characters")
    .max(50, "The alias cannot exceed 50 characters")
    .trim()
    .refine((val) => val.length > 0, {
      message: "The alias cannot be empty or contain only spaces",
    }),

  // Nombre del destinatario
  firstName: z
    .string()
    .min(2, "The name must have at least 2 characters")
    .max(50, "The name cannot exceed 50 characters")
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, {
      message:
        "The name can only contain letters, spaces, hyphens and apostrophes",
    })
    .refine((val) => val.length > 0, {
      message: "The name cannot be empty or contain only spaces",
    }),

  // Apellido del destinatario
  lastName: z
    .string()
    .min(2, "The last name must have at least 2 characters")
    .max(50, "The last name cannot exceed 50 characters")
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, {
      message:
        "The last name can only contain letters, spaces, hyphens and apostrophes",
    })
    .refine((val) => val.length > 0, {
      message: "The last name cannot be empty or contain only spaces",
    }),

  // Dirección principal (calle, número, piso, puerta)
  address: z
    .string()
    .min(5, "The address must have at least 5 characters")
    .max(200, "The address cannot exceed 200 characters")
    .trim()
    .refine((val) => val.length > 0, {
      message: "The address cannot be empty or contain only spaces",
    }),

  // Dirección secundaria (opcional - información adicional)
  address2: z
    .string()
    .max(200, "The additional address cannot exceed 200 characters")
    .trim()
    .optional()
    .or(z.literal("")), // Permite string vacío

  // Código postal
  postalCode: z
    .string()
    .min(3, "The postal code must have at least 3 characters")
    .max(10, "The postal code cannot exceed 10 characters")
    .trim()
    .regex(/^[a-zA-Z0-9\s-]+$/, {
      message:
        "The postal code can only contain letters, numbers, spaces and hyphens",
    })
    .refine((val) => val.length > 0, {
      message: "The postal code cannot be empty or contain only spaces",
    }),

  // Ciudad
  city: z
    .string()
    .min(2, "The city must have at least 2 characters")
    .max(100, "The city cannot exceed 100 characters")
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, {
      message:
        "The city can only contain letters, spaces, hyphens and apostrophes",
    })
    .refine((val) => val.length > 0, {
      message: "The city cannot be empty or contain only spaces",
    }),

  // Estado/Provincia/Región
  state: z
    .string()
    .min(2, "The state must have at least 2 characters")
    .max(100, "The state cannot exceed 100 characters")
    .trim()
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, {
      message:
        "The state can only contain letters, spaces, hyphens and apostrophes",
    })
    .refine((val) => val.length > 0, {
      message: "The state cannot be empty or contain only spaces",
    }),

  // País (ID del país seleccionado)
  country: z
    .string()
    .min(1, "You must select a country")
    .refine((val) => val !== "", {
      message: "You must select a valid country",
    }),

  // Teléfono de contacto
  phone: z
    .string()
    .min(8, "The phone number must have at least 8 characters")
    .max(20, "The phone number cannot exceed 20 characters")
    .trim()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      {
        message:
          "Please enter a valid phone number (e.g., +34 123 456 789 or 123456789)",
      },
    )
    .refine((val) => val.length > 0, {
      message: "The phone number cannot be empty or contain only spaces",
    }),
});

/**
 * Tipo TypeScript inferido del schema de validación
 * Úsalo para tipar los datos del formulario
 */
export type AddressFormValues = z.infer<typeof addressSchema>;

/**
 * Schema parcial para actualizaciones opcionales
 * Útil cuando solo se necesita validar algunos campos
 */
export const partialAddressSchema = addressSchema.partial();

/**
 * Tipo para actualizaciones parciales de dirección
 */
export type PartialAddressFormValues = z.infer<typeof partialAddressSchema>;
