import { AddressForm, PageTitle } from "@/components";
import { getCountries } from "@/actions";

export default async function NewAddressPage() {
  const countries = await getCountries();

  return (
    <div className="flex justify-center items-center px-2">
      <div className="flex flex-col w-6xl">
        <PageTitle title="New Address" subTitle="Add a new shipping address" />

        <AddressForm countries={countries} />
      </div>
    </div>
  );
}
