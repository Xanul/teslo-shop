import { getPaginatedOrders } from "@/actions";
import { PageTitle } from "@/components";
import { OrderTable } from "@/components";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { ok, orders } = await getPaginatedOrders();

  if (!ok) {
    redirect("/admin");
  }

  return (
    <>
      <PageTitle title="All Orders" />
      <OrderTable orders={orders ?? []} />
    </>
  );
}
