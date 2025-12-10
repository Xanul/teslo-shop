import { LinkButton } from "@/components";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md w-full">
        {/* Icono */}
        <div className="flex justify-center mb-6">
          <div className="relative bg-gray-50 p-6 rounded-full shadow-md">
            <IoCartOutline size={64} className="text-gray-400" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h1>

        {/* Descripción */}
        <p className="text-gray-500 text-base sm:text-lg mb-8">
          It seems you haven&apos;t added any products yet. Discover our
          collections and find something you&apos;ll love.
        </p>

        {/* Botón primario */}
        <LinkButton href="/" size="lg">
          Continue shopping
        </LinkButton>

        {/* Sugerencia adicional */}
        <p className="text-gray-400 text-sm mt-6">
          Need help?{" "}
          <span className="text-gray-600 font-medium">Contact us</span>
        </p>
      </div>
    </div>
  );
}
