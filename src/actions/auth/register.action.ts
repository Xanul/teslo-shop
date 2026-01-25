"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { RegisterUserSchema } from "@/schemas";

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

export async function registerUser(
  data: RegisterUserProps,
): Promise<RegisterActionState> {
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
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      ok: false,
      message: "Could not complete registration. Please try again later.",
    };
  }
}
