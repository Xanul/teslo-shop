// src/components/profile/addresses/AddressManagementList.tsx
"use client";

import { UserAddress } from "@/interfaces";
import { setDefaultAddress, deleteUserAddress } from "@/actions";
import { useRouter } from "next/navigation";
import { AddressCard } from "./addresses/AddressCard";
import { IoLocationOutline } from "react-icons/io5";

interface AddressListProps {
  addresses: UserAddress[];
}

export const AddressList = ({ addresses }: AddressListProps) => {
  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    return 0;
  });
  const router = useRouter();

  const handleSetDefault = async (id: string) => {
    await setDefaultAddress(id);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    const result = await deleteUserAddress(id);
    if (result.ok) router.refresh();
  };

  if (addresses.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded">
        <IoLocationOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No saved addresses</p>
        <p className="text-gray-400 text-sm mt-2">
          Add an address to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {sortedAddresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />
      ))}
    </div>
  );
};
