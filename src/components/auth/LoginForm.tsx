"use client";

import { authenticate } from "@/actions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { FiMail, FiLock, FiEye, FiAlertCircle } from "react-icons/fi";
import { MdOutlineArrowForward } from "react-icons/md";
import { IoReloadOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { Button, LinkButton } from "@/components";

export const LoginForm = () => {
  const queryParams = useSearchParams();
  const callbackURL = queryParams.get("callbackUrl") || "/";
  const [state, dispatch, isPending] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state === "success") {
      // router.replace("/")
      window.location.replace(callbackURL);
    }
  }, [state, callbackURL]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-50 p-6 sm:p-8">
      <form action={dispatch} className="space-y-5">
        {/* Error Message */}
        {state && state !== "success" && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <FiAlertCircle className="flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="font-medium">Invalid credentials</p>
              <p className="text-sm text-red-600 mt-1">
                Please verify your email and password and try again.
              </p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              disabled={isPending}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              disabled={isPending}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              disabled={isPending}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              aria-label="Toggle password visibility"
            >
              <FiEye size={20} />
            </button>
          </div>
        </div>

        {/* Remember & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Remember me</span>
          </label>
          <Link
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          className="w-full gap-2"
        >
          {isPending ? (
            <>
              <IoReloadOutline size={18} className="animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            <>
              Login
              <MdOutlineArrowForward size={18} />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="text-gray-500 text-sm font-medium">O</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Sign Up Link */}
      <LinkButton
        href="/auth/new-account"
        className="w-full"
        variant="secondary"
      >
        Create a new account
      </LinkButton>
    </div>
  );
};
