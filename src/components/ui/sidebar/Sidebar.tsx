"use client";

import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { SidebarSection } from "./SidebarSection";
import { SIDEBAR_ITEMS } from "@/config/components/sidebar.config";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const userItems = SIDEBAR_ITEMS.filter((item) => item.section === "USER");
  const adminItems = SIDEBAR_ITEMS.filter((item) => item.section === "ADMIN");
  const { isSideMenuOpen, closeSideMenu } = useUIStore();
  
  return (
    <div>
      {/* Black Background */}
      {isSideMenuOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black opacity-30" />
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-50 backdrop-filter backdrop-blur-sm"
            onClick={closeSideMenu}
          />
        </>
      )}

      {/* Sidemenu */}
      <nav
        className={cn(
          "fixed p-5 right-0 top-0 w-full max-w-md h-screen bg-white z-50 shadow-2xl transform transition-all duration-300",
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 rounded py-1 pl-10 pr-10 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* Menu */}
        <SidebarSection title="User">
          {userItems.map((item) => (
            <SidebarMenuItem
              href={item.href}
              icon={item.icon}
              label={item.label}
              key={item.id}
              onClick={() => console.log("Click")}
            />
          ))}
        </SidebarSection>
        <SidebarSection title="Admin">
          {adminItems.map((item) => (
            <SidebarMenuItem
              href={item.href}
              icon={item.icon}
              label={item.label}
              key={item.id}
              onClick={() => console.log("Click")}
            />
          ))}
        </SidebarSection>
      </nav>
    </div>
  );
};
