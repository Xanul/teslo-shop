import { AddressForm, PageTitle } from "@/components";
import { getAddressById, getCountries } from "@/actions";
import { redirect } from "next/navigation";

interface EditAddressPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAddressPage({
  params,
}: EditAddressPageProps) {
  const { id } = await params;

  // Fetch address and countries in parallel
  const [addressResult, countries] = await Promise.all([
    getAddressById(id),
    getCountries(),
  ]);

  // Validate address exists and user has access
  if (!addressResult.ok || !addressResult.address) {
    // Redirect to addresses list if address not found or unauthorized
    redirect("/profile/addresses");
  }

  return (
    <div className="flex justify-center items-center px-2">
      <div className="flex flex-col w-6xl">
        <PageTitle
          title="Edit Address"
          subTitle={`Editing: ${addressResult.address.alias}`}
        />

        <AddressForm countries={countries} address={addressResult.address} />
      </div>
    </div>
  );
}
