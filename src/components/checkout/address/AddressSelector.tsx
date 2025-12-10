"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IoCheckmarkCircle, IoRadioButtonOff, IoAdd } from "react-icons/io5";
import clsx from "clsx";

import { UserAddress } from "@/interfaces";
import { LinkButton, Button } from "@/components";
import { MdOutlineArrowForward } from "react-icons/md";
import { useAddressStore } from "@/store/address/address-store";

interface AddressSelectorProps {
  addresses: UserAddress[];
}

export const AddressSelector = ({ addresses }: AddressSelectorProps) => {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null
  );

  // Funcion para guardar el ID de la direccion seleccionada en el store y en localStorage
  const setSelectedAddressId = useAddressStore(
    (state) => state.setSelectedAddressId
  );

  // Funcion para guardar la direccion completa en el store
  const setAddress = useAddressStore((state) => state.setAddress);

  const sortedAddresses = useMemo(() => {
    return [...addresses].sort((a, b) => {
      if (a.isDefault) return -1;
      if (b.isDefault) return 1;
      return 0;
    });
  }, [addresses]);

  useEffect(() => {
    if (addresses.length > 0) {
      // Select the default address or the first one available
      const defaultAddress = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddress || addresses[0]);
    }
  }, [addresses]);

  const onNext = () => {
    if (!selectedAddress) return;

    // Guarda el ID de la direccion seleccionada en el store y en localStorage
    setSelectedAddressId(selectedAddress.id);

    // Guarda toda la direccion en el store
    setAddress(selectedAddress);

    router.push("/checkout");
  };

  if (addresses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-500 mb-4">No addresses found.</p>
        <LinkButton href="/profile/addresses/new" className="gap-2">
          <IoAdd /> Add New Address
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Button to add new direction */}
      <div className="mb-2">
        <LinkButton
          href="/profile/addresses/new?callbackUrl=/checkout/address"
          className="gap-2"
        >
          <IoAdd className="text-xl" />
          Add New Address
        </LinkButton>
      </div>
      {/* Directions list */}
      {sortedAddresses.map((address) => (
        <div
          key={address.id}
          onClick={() => setSelectedAddress(address)}
          className={clsx(
            "relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-xl border transition-all cursor-pointer",
            {
              "border-blue-500 bg-blue-50/30 shadow-sm ring-1 ring-blue-500":
                selectedAddress?.id === address.id,
              "border-gray-200 hover:bg-gray-50":
                selectedAddress?.id !== address.id,
            }
          )}
        >
          {/* Selection Indicator & Content */}
          <div className="flex items-start gap-4 w-full">
            <div className="mt-1">
              {selectedAddress?.id === address.id ? (
                <IoCheckmarkCircle className="text-2xl text-blue-500" />
              ) : (
                <IoRadioButtonOff className="text-2xl text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {address.alias || `${address.firstName} ${address.lastName}`}
                </h3>
                {address.isDefault && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                    Default
                  </span>
                )}
              </div>

              <div className="text-gray-600 text-sm space-y-0.5">
                <p>
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-gray-500 mt-1">{address.phone}</p>
                <p>
                  {address.postalCode}, {address.city}, {address.state},{" "}
                  {address.country.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Action Button */}
      <div className="flex items-center justify-end mt-4 pt-4">
        <Button
          onClick={onNext}
          disabled={!selectedAddress}
          className="w-full sm:w-auto gap-2"
        >
          Continue to Checkout
          <MdOutlineArrowForward size={18} />
        </Button>
      </div>
    </div>
  );
};
