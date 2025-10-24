import { CheckoutProductItem, PageTitle, PaymentConfirm, OrderSummary } from "@/components";
import { initialData } from "@/seed/seed";
import { use } from "react";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

const productsInCartMockup = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function OrderPage({ params }: OrderPageProps) {
  const { id } = use(params);

  // Todo: Verificar si la orden existe y pertenece al usuario

  return (
    <div className="flex justify-center items-center px-2 ">
      <div className="flex flex-col w-6xl">
        <PageTitle title={`Order: #${id}`} subTitle="Order confirmation" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Cart */}
          <div className="flex flex-col gap-3">
            <PaymentConfirm />
            {productsInCartMockup.map((product) => (
              <CheckoutProductItem
                product={product}
                key={product.slug}
                quantity={2}
              />
            ))}
          </div>
          {/* Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
