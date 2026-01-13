import { getPaginatedUsers } from "@/actions";
import { PageTitle } from "@/components";
import { UsersTable } from "@/components";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { ok, users } = await getPaginatedUsers();

  if (!ok) {
    redirect("/admin");
  }

  return (
    <>
      <PageTitle title="Users Managment" />
      <UsersTable users={users!} />
    </>
  );
}
