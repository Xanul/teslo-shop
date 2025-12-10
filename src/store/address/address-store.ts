import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserAddress } from "@/interfaces";

interface AddressState {
  address: UserAddress;
  setAddress: (address: UserAddress) => void;
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
  clearSelectedAddressId: () => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      address: {
        address: "",
        address2: "",
        alias: "",
        city: "",
        country: {
          id: "",
          name: "",
        },
        countryId: "",
        firstName: "",
        id: "",
        isDefault: false,
        lastName: "",
        phone: "",
        postalCode: "",
        state: "",
        userId: "",
      },
      setAddress: (address: UserAddress) => {
        set({ address });
      },
      selectedAddressId: null,
      setSelectedAddressId: (id: string | null) => {
        set({ selectedAddressId: id })
      },
      clearSelectedAddressId: () => {
        set({ selectedAddressId: null })
      },

    }),
    { name: "address-store" }
  )
);
