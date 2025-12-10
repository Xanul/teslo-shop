"use client";
import { useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiAlertCircle } from "react-icons/fi";
import { MdOutlineArrowForward } from "react-icons/md";
import { titleFont } from "@/config/fonts";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser, login } from "@/actions";
import { Button, LinkButton } from "@/components";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function NewAccountForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");

    const result = await registerUser(data);
    if (!result.ok) return setErrorMessage(result.message);

    await login(data.email.toLowerCase(), data.password);

    window.location.replace("/");
  };

  const passwordValue = watch("password", "");

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-2">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <span
              className={`${titleFont.className} text-xl text-white font-bold`}
            >
              T
            </span>
          </div>
        </div>
        <h1
          className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-2`}
        >
          Create Account
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Join us and start shopping today
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-50 p-6 sm:p-8">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Error Message */}
          <div>
            {errorMessage && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                <FiAlertCircle className="flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="font-medium">{errorMessage}</p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="relative">
                <FiUser
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors"
                  autoComplete="given-name"
                  aria-invalid={errors.name ? "true" : "false"}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must have at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <FiMail
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <FiLock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors"
                autoComplete="new-password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message:
                      "At least 8 characters with uppercase, lowercase, and numbers",
                  },
                  validate: {
                    hasUppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Include at least one uppercase letter",
                    hasLowercase: (value) =>
                      /[a-z]/.test(value) ||
                      "Include at least one lowercase letter",
                    hasNumber: (value) =>
                      /\d/.test(value) || "Include at least one number",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                aria-pressed={showPassword}
                onClick={() => setShowPassword((value) => !value)}
              >
                <FiEye size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              At least 8 characters with uppercase, lowercase, and numbers
            </p>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <FiLock
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors"
                autoComplete="new-password"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmación de contraseña"
                    : "Mostrar confirmación de contraseña"
                }
                aria-pressed={showConfirmPassword}
                onClick={() => setShowConfirmPassword((value) => !value)}
              >
                <FiEye size={20} />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full gap-2" variant="primary">
            Create Account
            <MdOutlineArrowForward size={18} />
          </Button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="text-gray-500 text-sm font-medium">Or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <LinkButton href="/auth/login" className="w-full" variant="secondary">
          Already have an account? Sign in
        </LinkButton>
      </div>

      <div className="mt-6 text-center text-xs text-gray-600">
        <p>We respect your privacy. Your data is secure with us.</p>
      </div>
    </div>
  );
}
