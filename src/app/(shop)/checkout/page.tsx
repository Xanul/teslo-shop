import { CheckoutProductItem, PageTitle } from "@/components";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { initialData } from "@/seed/seed";
import Link from "next/link";

const productsInCartMockup = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center px-2 ">
      <div className="flex flex-col w-6xl">
        <PageTitle title="Checkout" subTitle="Review your order" />

        <Link href={"/"}>
          <span className="text-xl">Add more items</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Cart */}
          <div className="flex flex-col gap-3">
            {productsInCartMockup.map((product) => (
              <CheckoutProductItem product={product} key={product.slug} quantity={2} />
            ))}
          </div>
          {/* Order Summary */}
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
