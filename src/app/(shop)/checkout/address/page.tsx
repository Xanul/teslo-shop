import { AddressSelector, PageTitle } from "@/components";
import { getUserAddresses } from "@/actions";

export default async function AddressPage() {
  const addresses = await getUserAddresses();

  return (
    <div className="flex justify-center items-center px-2">
      <div className="flex flex-col w-6xl">
        <PageTitle
          title="Address"
          subTitle="Please select a shipping address"
        />
        <AddressSelector addresses={addresses.addresses} />
      </div>
    </div>
  );
}
