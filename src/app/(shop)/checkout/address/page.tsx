import { PageTitle } from "@/components";
import Link from "next/link";

export default function AddressPage() {
  return (
    <div className="flex justify-center items-center px-2">
      <div className="flex flex-col w-6xl">
        <PageTitle title="Address" subTitle="Delivery address" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5 w-full max-w-5xl mx-auto">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              First Name
            </span>
            <input
              type="text"
              className="p-2 border bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Last Name</span>
            <input
              type="text"
              className="p-2 border bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Address</span>
            <input
              type="text"
              className="p-2 border bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Address 2</span>
            <input
              type="text"
              className="p-2 border bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Zip Code</span>
            <input
              type="text"
              className="p-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">City</span>
            <input
              type="text"
              className="p-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">País</span>
            <select className="p-2 border bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300">
              <option value=""> Select Country </option>
              <option value="CRI">Costa Rica</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Phone</span>
            <input
              type="text"
              className="p-2 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2 sm:mt-5 sm:col-start-2">
            <Link
              href="/checkout"
              className="sm:w-1/2 btn-primary w-full text-center sm:ml-auto"
            >
              Siguiente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
