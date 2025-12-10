// src/app/(shop)/profile/addresses/page.tsx
import { getUserAddresses } from "@/actions";
import Link from "next/link";
import { AddressList, PageTitle } from "@/components";
import { IoAddCircleOutline } from "react-icons/io5";

export default async function ProfileAddressesPage() {
  const { addresses } = await getUserAddresses();

  return (
    <div className="flex justify-center items-center px-2">
      <div className="flex flex-col w-6xl">
        <PageTitle
          title="My Addresses"
          subTitle="Manage your shipping addresses"
        />

        {/* Botón de nueva dirección */}
        <div className="mb-6">
          <Link
            href="/profile/addresses/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <IoAddCircleOutline className="text-xl" />
            Add New Address
          </Link>
        </div>

        {/* Lista de direcciones */}
        <div className="mb-10">
          <AddressList addresses={addresses} />
        </div>
      </div>
    </div>
  );
}
