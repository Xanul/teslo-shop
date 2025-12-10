"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/config/auth.config";
import { z } from "zod";

const registerUserSchema = z
  .object({
    name: z
      .string({ message: "El nombre es obligatorio" })
      .trim()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
      .max(100, { message: "El nombre no puede exceder los 100 caracteres" }),
    email: z
      .email({ message: "Ingresa un correo válido" })
      .trim()
      .toLowerCase(),
    password: z
      .string({ message: "La contraseña es obligatoria" })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(18, { message: "La contraseña no puede exceder los 18 caracteres" })
      .regex(/[A-Z]/, { message: "Incluye al menos una letra mayúscula" })
      .regex(/[a-z]/, { message: "Incluye al menos una letra minúscula" })
      .regex(/\d/, { message: "Incluye al menos un número" }),
  });

type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export type RegisterActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof RegisterUserSchema, string>>;
};

interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterUserProps): Promise<RegisterActionState> {
  
  const { name, email, password } = data;
  
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });

    if (existingUser) {
      return {
        ok: false,
        message: "The email is already registered.",
        fieldErrors: { email: "This email is already in use" },
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      ok: true,
      message: "Account created successfully.",
    }
    
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      ok: false,
      message: "Could not complete registration. Please try again later.",
    };
  }
}

