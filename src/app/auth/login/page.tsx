import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className={`${titleFont.className} text-xl text-white font-bold`}>T</span>
            </div>
          </div>
          <h1 className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-2`}>
            Welcome back
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Access your account to continue shopping
          </p>
        </div>

        {/* Form Card */}
        <LoginForm />

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By logging in, you agree to our{" "}
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Terms of service
            </Link>
            {" "}y{" "}
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Privacy policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
