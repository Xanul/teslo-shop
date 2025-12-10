import { auth } from "@/config/auth.config";
import { redirect } from "next/navigation";

const ShopLayout = async({ children }: { children: React.ReactNode }) => {
 

  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <main className="flex justify-center">
      <div className="w-full">
      {children}
      </div>
    </main>
  )
}

export default ShopLayout;
