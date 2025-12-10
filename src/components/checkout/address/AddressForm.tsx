"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Country, UserAddress } from "@/interfaces";
import { useAddressStore } from "@/store";
import { createUserAddress, updateUserAddress } from "@/actions";
import { toast } from "sonner";
import { Button } from "@/components";

type FormValues = {
  alias: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
};

interface AddressFormProps {
  countries: Country[];
  address?: UserAddress; // Optional - if provided, form is in edit mode
}

export const AddressForm = ({ countries, address }: AddressFormProps) => {
  const queryParams = useSearchParams();
  const callbackURL = queryParams.get("callbackUrl") || "/profile/addresses";
  const router = useRouter();
  // const setAddressToLocal = useAddressStore((state) => state.setAddress);
  const localAddress = useAddressStore((state) => state.address);

  // Configuración de react-hook-form para el manejo del formulario
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: "onChange", // Validación en tiempo real al cambiar los campos
    defaultValues: address
      ? {
          // Edit mode - pre-fill with existing data
          alias: address.alias,
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2 || "",
          postalCode: address.postalCode,
          city: address.city,
          state: address.state,
          country: address.countryId,
          phone: address.phone,
        }
      : {
          // Create mode - empty form
        },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (address) {
        // Edit mode - update existing address
        const result = await updateUserAddress(address.id, data);
        if (result.ok) {
          reset();
          toast.success("Address updated successfully");
          router.push(callbackURL);
        } else {
          toast.error(result.message || "Error updating address");
        }
      } else {
        // Create mode - create new address
        const result = await createUserAddress(data);
        if (result.ok) {
          reset();
          toast.success("Address created successfully");
          router.push(callbackURL);
        } else {
          toast.error("Error creating address");
        }
      }
    } catch (error) {
      toast.error(
        address ? "Error updating address" : "Error creating address"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8"
    >
      {/* Sección de información personal */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo: Alias */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              htmlFor="alias"
              className="text-sm font-medium text-gray-700"
            >
              Alias <span className="text-red-500">*</span>
            </label>
            <input
              id="alias"
              type="text"
              placeholder="Enter an address alias (e.g., Home, Work)"
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("alias", { required: "The alias is required" })}
            />
            {errors.alias && (
              <span className="text-xs text-red-600 mt-1">
                {errors.alias.message}
              </span>
            )}
          </div>

          {/* Campo: Nombre */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your name"
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("firstName", { required: "The name is required" })}
            />
            {errors.firstName && (
              <span className="text-xs text-red-600 mt-1">
                {errors.firstName.message}
              </span>
            )}
          </div>

          {/* Campo: Apellido */}
          <div className="flex flex-col gap-1.5 ">
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("lastName", {
                required: "The last name is required",
              })}
            />
            {errors.lastName && (
              <span className="text-xs text-red-600 mt-1">
                {errors.lastName.message}
              </span>
            )}
          </div>

          {/* Campo: Teléfono */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+34 123 456 789"
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("phone", {
                required: "The phone number is required",
              })}
            />
            {errors.phone && (
              <span className="text-xs text-red-600 mt-1">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sección de dirección */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Shipping Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo: Dirección principal */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="Street, number, floor, door..."
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("address", {
                required: "The address is required",
              })}
            />
            {errors.address && (
              <span className="text-xs text-red-600 mt-1">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Campo: Dirección secundaria (opcional) */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              htmlFor="address2"
              className="text-sm font-medium text-gray-700"
            >
              Address 2{" "}
              <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              id="address2"
              type="text"
              placeholder="Additional address information"
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("address2")}
            />
          </div>

          {/* Campo: Código postal */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="postalCode"
              className="text-sm font-medium text-gray-700"
            >
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="28001"
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("postalCode", {
                required: "The postal code is required",
              })}
            />
            {errors.postalCode && (
              <span className="text-xs text-red-600 mt-1">
                {errors.postalCode.message}
              </span>
            )}
          </div>

          {/* Campo: Selector de país */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="country"
              className="text-sm font-medium text-gray-700"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              {...register("country", { required: "The country is required" })}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="text-xs text-red-600 mt-1">
                {errors.country.message}
              </span>
            )}
          </div>

          {/* Campo: Estado */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="state"
              className="text-sm font-medium text-gray-700"
            >
              State <span className="text-red-500">*</span>
            </label>
            <input
              id="state"
              type="text"
              placeholder=""
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("state", { required: "The state is required" })}
            />
            {errors.state && (
              <span className="text-xs text-red-600 mt-1">
                {errors.state.message}
              </span>
            )}
          </div>

          {/* Campo: Ciudad */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              type="text"
              placeholder="Madrid"
              className="px-3 py-2.5 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              {...register("city", { required: "The city is required" })}
            />
            {errors.city && (
              <span className="text-xs text-red-600 mt-1">
                {errors.city.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Botón de envío del formulario */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
          size="md"
        >
          {address ? "Update Address" : "Save Address"}
        </Button>
      </div>
    </form>
  );
};
