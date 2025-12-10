import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserAddressInput } from "@/interfaces";

interface AddressState {
  address: UserAddressInput;
  setAddress: (address: UserAddressInput) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address: UserAddressInput) => {
        set({ address });
      },
    }),
    { name: "address-store" }
  )
);
