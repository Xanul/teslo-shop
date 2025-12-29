import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

interface OrderRowProps {
  order: {
    id: string;
    isPaid: boolean;
    orderAddress: {
      firstName: string;
      lastName: string;
    } | null;
  };
}

export const OrderRow = ({ order }: OrderRowProps) => {
  return (
    <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {order.id.split("-").at(-1)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {order.orderAddress?.firstName} {order.orderAddress?.lastName}
      </td>
      <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <IoCardOutline
          className={order.isPaid ? "text-green-800" : "text-red-800"}
        />
        <span
          className={`mx-2 ${order.isPaid ? "text-green-800" : "text-red-800"}`}
        >
          {order.isPaid ? "Paid" : "Not Paid"}
        </span>
      </td>
      <td className="text-sm text-gray-900 font-light px-6">
        <Link href={`/orders/${order.id}`} className="hover:underline">
          View order
        </Link>
      </td>
    </tr>
  );
};
