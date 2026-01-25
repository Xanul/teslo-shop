import { z } from "zod";

// Schema base para registro de usuario (usado en el backend)
export const registerUserSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio" })
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "El nombre no puede exceder los 100 caracteres" }),
  email: z.email({ message: "Ingresa un correo válido" }).trim().toLowerCase(),
  password: z
    .string({ message: "La contraseña es obligatoria" })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(18, { message: "La contraseña no puede exceder los 18 caracteres" })
    .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula" })
    .regex(/\d/, { message: "Incluye al menos un número" }),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;

// Schema extendido para el formulario de registro (incluye confirmación de contraseña)
export const registerFormSchema = registerUserSchema
  .extend({
    confirmPassword: z.string({ message: "Por favor confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
