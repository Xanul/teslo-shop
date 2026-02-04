import { getPaginatedUsers } from "@/actions";
import { PageTitle, Pagination } from "@/components";
import { UsersTable } from "@/components";
import { redirect } from "next/navigation";

interface UserPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: UserPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  const { ok, users, totalPages } = await getPaginatedUsers(currentPage);

  if (users?.length === 0 && currentPage > 1) redirect("/admin/users?page=1");

  if (!ok) {
    console.error("[Admin Users] Failed to fetch users");
    redirect("/admin");
  }

  return (
    <>
      <PageTitle title="Users Management" />
      <UsersTable users={users ?? []} />
      <Pagination totalPages={totalPages ?? 1} />
    </>
  );
}
