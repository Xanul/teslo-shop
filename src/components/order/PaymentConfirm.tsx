import { cn } from "@/lib/utils";
import { IoCardOutline } from "react-icons/io5";

interface PaymentConfirmProps {
  isPaid: boolean;
}

export const PaymentConfirm = ({ isPaid }: PaymentConfirmProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center py-2 px-3.5 rounded-lg text-white font-bold mb-2",
        {
          "bg-red-500": !isPaid,
          "bg-emerald-500": isPaid,
        }
      )}
    >
      <IoCardOutline size={20} />
      <h3>{isPaid ? "Payment confirmed" : "Pending payment"}</h3>
    </div>
  );
};
