// src/components/checkout/address/AddressCheckoutSelector.tsx
"use client";

import { UserAddress } from "@/interfaces";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  addresses: UserAddress[];
}

export const AddressCheckoutSelector = ({ addresses }: Props) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | undefined>(
    addresses.find(a => a.isDefault)?.id
  );

  const handleSelect = (addressId: string) => {
    setSelectedId(addressId);
    // Guardar en store/session/cookie para usar en el checkout
    // Luego redirigir
    router.push("/checkout");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {addresses.map((address) => (
        <button
          key={address.id}
          onClick={() => handleSelect(address.id)}
          className={`border rounded-lg p-4 text-left transition-all ${
            selectedId === address.id
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {address.isDefault && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
              Predeterminada
            </span>
          )}
          <h3 className="font-bold text-lg">{address.alias}</h3>
          <p className="text-sm">{address.firstName} {address.lastName}</p>
          <p className="text-sm text-gray-600">
            {address.address}, {address.city}
          </p>
          <p className="text-sm text-gray-600">{address.phone}</p>
        </button>
      ))}
    </div>
  );
};