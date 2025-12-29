// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from "@/actions";
import { PageTitle } from "@/components";
import { OrderTable } from "@/components";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { ok, orders } = await getOrdersByUser();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <PageTitle title="Orders" />
      <OrderTable orders={orders ?? []} />
    </>
  );
}
