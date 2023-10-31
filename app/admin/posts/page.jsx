"use client";
import BlogContext from "@/components/context/BlogContext";
import { useContext } from "react";

export default function page() {
   const { pendingPosts, changeStatus } = useContext(BlogContext);

   return (
      <div className="container mx-auto">
         <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
         <table className="table-auto w-full">
            <thead>
               <tr className="text-left">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Action</th>
               </tr>
            </thead>
            <tbody>
               {pendingPosts.map((post) => (
                  <tr key={post._id}>
                     <td className="border px-4 py-2">{post.title}</td>
                     <td className="border px-4 py-2">{post.description}</td>
                     <td className="border px-4 py-2">{post.user}</td>
                     <td>
                        <button
                           className="text-green-600"
                           onClick={() => {
                              changeStatus(post._id, "accepted");
                           }}
                        >
                           accept
                        </button>{" "}
                        |{" "}
                        <button
                           className="text-red-600"
                           onClick={() => {
                              changeStatus(post._id, "rejected");
                           }}
                        >
                           reject
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
