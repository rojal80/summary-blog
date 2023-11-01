"use client";
import BlogContext from "@/components/context/BlogContext";
import { useContext } from "react";

export default function Users() {
  const { users } = useContext(BlogContext);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
