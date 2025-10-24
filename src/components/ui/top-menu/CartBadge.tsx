import { cn } from "@/lib/utils";

interface CartBadgeProps {
  count: number;
  className?: string;
}

export const CartBadge = ({ count, className }: CartBadgeProps) => {
  if (count === 0) return null;
  return (
    <span
      className={cn(
        // Base styles
        "absolute text-xs rounded-full font-bold px-1",
        // Position
        "-top-2 -right-2",
        // Color
        "bg-blue-700 text-white",
        // Dinamic padding
        
        // Additional styles
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};
