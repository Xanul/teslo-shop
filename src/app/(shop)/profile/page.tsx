import { auth } from "@/config/auth.config";
import { PageTitle } from "@/components";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  IoCartOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const { name, email, role } = session.user;

  // Función para obtener las iniciales del usuario
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  

  return (
    <div className="flex justify-center items-center px-2">
      <div className="flex flex-col w-6xl">
        <PageTitle
          title="My Profile"
          subTitle="Account information and settings"
        />

        {/* User Information */}
        <div className="mb-10 p-6 bg-gray-50 rounded">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {getInitials(name)}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{name || "User"}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-lg font-semibold">{email}</p>
            </div>
            {role === "admin" && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Role</p>
                <p className="text-lg font-semibold capitalize">{role}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {/* Orders */}
          <Link
            href="/orders"
            className="border border-gray-300 rounded p-6 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <IoCartOutline className="text-2xl" />
              <h3 className="text-xl font-semibold">My Orders</h3>
            </div>
            <p className="text-sm text-gray-600">View and track your orders</p>
          </Link>

          {/* Addresses */}
          <Link
            href="/profile/addresses"
            className="border border-gray-300 rounded p-6 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <IoLocationOutline className="text-2xl" />
              <h3 className="text-xl font-semibold">Shipping Addresses</h3>
            </div>
            <p className="text-sm text-gray-600">
              Manage your delivery locations
            </p>
          </Link>

          {/* Admin Dashboard (Conditional) */}
          {role === "admin" && (
            <Link
              href="/admin"
              className="border border-gray-900 rounded p-6 bg-gray-900 text-white hover:bg-gray-800 transition-colors sm:col-span-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <IoShieldCheckmarkOutline className="text-2xl" />
                <h3 className="text-xl font-semibold">Admin Dashboard</h3>
              </div>
              <p className="text-sm text-gray-300">
                Manage users, products, and system settings
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
