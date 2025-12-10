"use client";

import { UserAddress } from "@/interfaces";
import Link from "next/link";
import {
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoCreateOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoTrashOutline,
} from "react-icons/io5";

interface AddressCardProps {
  address: UserAddress;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export const AddressCard = ({
  address,
  onDelete,
  onSetDefault,
}: AddressCardProps) => {
  return (
    <div className="flex flex-col justify-between border border-gray-300 rounded p-5 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between mb-4">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 pr-20">
          {address.alias}
        </h3>
        {address.isDefault && (
          <div className="inline-flex gap-2 items-center justify-center bg-green-100 py-2 px-3">
            <IoCheckmarkCircleOutline className="text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-600">Default</p>
          </div>
        )}
      </div>

      {/* Address Details */}
      <div className="space-y-2 mb-4">
        {/* Name */}
        <div className="flex items-start gap-2">
          <IoPersonOutline className="text-gray-400 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            {address.firstName} {address.lastName}
          </p>
        </div>
        {/* Address */}
        <div className="flex items-start gap-2">
          <IoLocationOutline className="text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p>{address.address}</p>
            {address.address2 && <p>{address.address2}</p>}
            <p>{address.postalCode}</p>
            <p>
              {address.city}, {address.state}, {address.country.name}
            </p>
          </div>
        </div>
        {/* Teléfono */}
        <div className="flex items-center gap-2">
          <IoCallOutline className="text-gray-400 flex-shrink-0" />
          <p className="text-sm text-gray-600">{address.phone}</p>
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        <Link
          href={`/profile/addresses/edit/${address.id}`}
          className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
        >
          <IoCreateOutline className="text-base" />
          Edit
        </Link>
        {!address.isDefault && (
          <button
            onClick={() => {
              onSetDefault?.(address.id);
            }}
            className="inline-flex items-center gap-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded transition-colors text-sm"
          >
            <IoCheckmarkCircleOutline className="text-base" />
            Set as default
          </button>
        )}
        <button
          onClick={() => {
            onDelete?.(address.id);
          }}
          className="inline-flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm ml-auto"
        >
          <IoTrashOutline className="text-base" />
          Delete
        </button>
      </div>
    </div>
  );
};
