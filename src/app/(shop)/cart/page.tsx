import { CartSummary, PageTitle, ProductCart } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCartMockup = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
];

export default function CartPage() {

  // redirect("/empty");
  
  return (
    <div className="flex justify-center items-center px-2 ">
      <div className="flex flex-col w-6xl">
        <PageTitle title="Cart" subTitle="Items in your cart" />

        <Link href={"/"}>
          <span className="text-xl">Add more items</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Cart */}
          <div className="flex flex-col gap-3">
            {productsInCartMockup.map((product) => (
              <ProductCart product={product} key={product.slug} />
            ))}
          </div>
          {/* Order Summary */}
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
