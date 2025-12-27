import { getOrderById } from "@/actions";
import { PageTitle, OrderSummary, OrderProductItem } from "@/components";
import { redirect } from "next/navigation";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  const shortId = id.slice(0, 6);

  const { ok, order } = await getOrderById(id);

  console.log({ order });

  if (!ok || !order) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center px-2 ">
      <div className="flex flex-col w-6xl">
        <PageTitle title={`Order: #${shortId}`} subTitle="Order confirmation" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col gap-3">
            {order.orderItems.map((product) => (
              <OrderProductItem orderItem={product} key={product.id} />
            ))}
          </div>
          <OrderSummary
            orderAddress={order.orderAddress!}
            subTotal={order.subTotal}
            tax={order.tax}
            total={order.total}
            itemsInOrder={order.itemsInOrder}
            isPaid={order.isPaid}
          />
        </div>
      </div>
    </div>
  );
}
