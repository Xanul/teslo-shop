"use server";

import { signIn } from "@/config/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        case "CallbackRouteError":
          return "Callback route error";
        default:
          return "An error occurred while logging in";
      }
    }
    return "An error occurred while logging in";
  }
}

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", {email, password})
    return {
      ok: true
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "An error occurred while logging in"
    }
  }
} 
