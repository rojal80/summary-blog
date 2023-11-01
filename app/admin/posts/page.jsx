"use client";
import BlogContext from "@/components/context/BlogContext";
import Link from "next/link";
import { useContext } from "react";

export default function Posts() {
  const { pendingPosts, changeStatus } = useContext(BlogContext);

  // For truncating long paragraphs
  function truncateSentence(description, maxWords) {
    const words = description.split(" ");
    if (words.length > maxWords) {
      const truncatedWords = words.slice(0, maxWords);
      return truncatedWords.join(" ") + " ...";
    }
    return description;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <table className="table-fixed w-full">
        <thead>
          <tr className="text-left">
            <th className="w-1/4 px-4 py-2">Title</th>
            <th className="w-2/4 px-4 py-2">Description</th>
            <th className="w-1/4 px-4 py-2">User</th>
            <th className="w-1/4 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingPosts.map((post) => (
            <tr key={post._id}>
              <td className="w-1/4 border px-4 py-2">
                {truncateSentence(post.title, 5)}
              </td>
              <td className="w-2/4 border px-4 py-2">
                {truncateSentence(post.description, 10)}
              </td>
              <td className="w-1/4 border px-4 py-2">{post.user.name}</td>
              <td className="w-1/4 border">
                <Link href={`/admin/posts/${post._id}`}>view</Link> |
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
