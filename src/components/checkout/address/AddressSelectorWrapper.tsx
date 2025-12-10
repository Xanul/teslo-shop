"use client";

import { UserAddress } from "@/interfaces";
import { useState } from "react";
import { AddressSelector } from "./AddressSelector";

interface AddressSelectorWrapperProps {
  addresses: UserAddress[];
}

export const AddressSelectorWrapper = ({
  addresses,
}: AddressSelectorWrapperProps) => {
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >(undefined);

  const handleSelectAddress = (address: UserAddress) => {
    setSelectedAddressId(address.id);

    console.log("Direccion seleccionada: ", address);
  };

  return (
    <AddressSelector
      addresses={addresses}
      onSelectAddress={handleSelectAddress}
      selectedAddressId={selectedAddressId}
    />
  );
};
