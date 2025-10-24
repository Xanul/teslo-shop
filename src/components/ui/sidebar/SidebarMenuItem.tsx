import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarMenuItemProps {
  href: string;
  icon: IconType;
  label: string;
  onClick?: () => void;
}

export const SidebarMenuItem = ({
  href,
  icon: Icon,
  label,
  onClick,
}: SidebarMenuItemProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <div className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded transition-colors duration-200 cursor-pointer">
        <Icon size={24} className="flex-shrink-0" />
        <span className="text-base font-medium">{label}</span>
      </div>
    </Link>
  );
};
