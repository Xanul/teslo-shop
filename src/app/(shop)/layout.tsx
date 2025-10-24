import { Footer, Sidebar, TopMenu } from "@/components";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1920px] mx-auto">
      <TopMenu />
      <main className="min-h-screen">
      <Sidebar />
      <div className="px-2 sm:px-10">
      {children}
      </div>
      <Footer />
    </main>
    </div>
    
  )
}

export default ShopLayout;
