import { IconType } from "react-icons";
import { IoPersonOutline, IoLogInOutline, IoLogOutOutline, IoShirtOutline, IoPeopleOutline, IoTicketOutline } from "react-icons/io5";

export interface SidebarItem {
    id: string;
    label: string;
    icon: IconType;
    href: string;
    section?: 'USER' | 'ADMIN';
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
     // User Section
  {
    id: 'profile',
    label: 'Profile',
    icon: IoPersonOutline,
    href: '/profile',
    section: 'USER',
  },
  {
    id: 'orders',
    label: 'My Orders',
    icon: IoTicketOutline,
    href: '/orders',
    section: 'USER',
  },
  {
    id: 'login',
    label: 'Login',
    icon: IoLogInOutline,
    href: '/auth/login',
    section: 'USER',
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: IoLogOutOutline,
    href: '/auth/logout',
    section: 'USER',
  },
  // Admin Section
  {
    id: 'products',
    label: 'Products',
    icon: IoShirtOutline,
    href: '/admin/products',
    section: 'ADMIN',
  },
  {
    id: 'orders-admin',
    label: 'Orders Management',
    icon: IoTicketOutline,
    href: '/admin/orders',
    section: 'ADMIN',
  },
  {
    id: 'users',
    label: 'Users',
    icon: IoPeopleOutline,
    href: '/admin/users',
    section: 'ADMIN',
  },
]