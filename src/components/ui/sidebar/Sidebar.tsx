"use client";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { SidebarSection } from "./SidebarSection";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useUIStore } from "@/store";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore();
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  const handleLogout = async () => {
    closeSideMenu();
    await signOut({
      callbackUrl: "/",
    });
  };

  if (!isMounted) return null;

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
          {isAuthenticated && (
            <>
              <SidebarMenuItem
                href={"/profile"}
                icon={IoPersonOutline}
                label="Profile"
                onClick={() => closeSideMenu()}
              />
              <SidebarMenuItem
                href={"/orders"}
                icon={IoTicketOutline}
                label="My Orders"
                onClick={() => closeSideMenu()}
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded transition-colors duration-200 cursor-pointer2"
              >
                <IoLogOutOutline size={24} className="flex-shrink-0" />
                <span className="text-base font-medium">Logout</span>
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <SidebarMenuItem
                href={"/auth/login"}
                icon={IoLogInOutline}
                label="Login"
                onClick={() => closeSideMenu()}
              />
            </>
          )}
        </SidebarSection>
        {isAdmin && (
          <SidebarSection title="Admin">
            <SidebarMenuItem
              href={"/"}
              icon={IoShirtOutline}
              label="Products Managment"
              onClick={() => closeSideMenu()}
            />
            <SidebarMenuItem
              href={"/"}
              icon={IoTicketOutline}
              label="Orders Managment"
              onClick={() => closeSideMenu()}
            />
            <SidebarMenuItem
              href={"/"}
              icon={IoPeopleOutline}
              label="Users Managment"
              onClick={() => closeSideMenu()}
            />
          </SidebarSection>
        )}
      </nav>
    </div>
  );
};
