"use client";

import { updateUserRole } from "@/actions";
import { User, UserRole } from "@/interfaces";
import { useState } from "react";
import { toast } from "sonner";

interface UserRowProps {
  user: User;
}

export const UserRow = ({ user }: UserRowProps) => {
  const [role, setRole] = useState(user.role);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async (newRole: UserRole) => {
    setIsUpdating(true);
    setRole(newRole);

    try {
      await updateUserRole(user.id, newRole);
      toast.success(`User role of ${user.name} updated successfully`);
    } catch (error) {
      console.error("Error updating user role:", error);
      setRole(user.role); // Revertir en caso de error
      toast.error("Error updating user role");
    }

    setIsUpdating(false);
  };

  return (
    <tr className="bg-white border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.email}
      </td>
      <td className="text-sm px-6 py-4 whitespace-nowrap">
        <select
          value={role}
          onChange={(e) => handleRoleChange(e.target.value as UserRole)}
          disabled={isUpdating}
          className={`
            px-3 py-2 border rounded-md text-sm font-medium
            transition-colors duration-200
            ${
              role === "admin"
                ? "bg-blue-100 border-blue-300 text-blue-800"
                : "bg-gray-100 border-gray-300 text-gray-800"
            }
            ${
              isUpdating
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-80"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          `}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
    </tr>
  );
};
