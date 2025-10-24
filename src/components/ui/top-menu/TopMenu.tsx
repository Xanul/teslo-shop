"use client";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { NavLink } from "./NavLink";
import { CartBadge } from "./CartBadge";
import { useUIStore } from "@/store";

export const TopMenu = () => {
  const { openSideMenu } = useUIStore();
  return (
    // Top Menu
    <nav className="sticky top-0 z-50 flex px-5 justify-between items-center w-full h-16 border-b border-gray-200 bg-white">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* Center Menu */}
      <div className="hidden sm:block">
        <NavLink href="/category/men">Men</NavLink>
        <NavLink href="/category/women">Women</NavLink>
        <NavLink href="/category/kid">Kids</NavLink>
      </div>
      {/* Right Menu */}
      <div className="flex items-center gap-3">
        <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart">
          <div className="relative">
            <CartBadge count={100} />
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        {/* Mobile Menu */}
        <button className="p-2 rounded-md transition-all hover:bg-gray-100" onClick={openSideMenu}>
            Menu
        </button>
      </div>
    </nav>
  );
};
