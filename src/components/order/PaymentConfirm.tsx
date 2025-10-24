import { cn } from "@/lib/utils";
import { IoCardOutline } from "react-icons/io5";

export const PaymentConfirm = () => {
  return (
    <div className={cn("flex gap-2 items-center py-2 px-3.5 rounded-lg text-white font-bold mb-2", {
      "bg-red-500": false,
      "bg-emerald-500": true,
    })}>
      <IoCardOutline size={20}/>
      <h3>Payment confirmed</h3>
    </div>
  );
};