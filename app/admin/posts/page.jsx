"use client";
import BlogContext from "@/components/context/BlogContext";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";

import binarySearch from "@/algorithms/binarySearch";

export default function Posts() {
   const { pendingPosts, changeStatus } = useContext(BlogContext);

   const [search, setSearch] = useState("");
   const [searchResult, setSearchResult] = useState([]);
   const handleChange = (e) => {
      setSearch(e.target.value);
   };

   useEffect(() => {
      setSearchResult(pendingPosts);
   }, [pendingPosts]);

   let result;
   const handleClick = (e) => {
      e.preventDefault();
      if (search === "") return setSearchResult(pendingPosts);
      result = binarySearch(pendingPosts, search.toLowerCase());
      if (result) setSearchResult([result]);
      else setSearchResult([]);
   };

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
         <div className="flex">
            <h1 className="text-3xl font-bold mb-4 ">Blog Posts</h1>
            <div className=" w-1/2 flex mx-auto">
               <input
                  type="text"
                  className=" w-full h-fit px-2 py-1   border border-gray-800 focus:outline-gray-800 rounded-md shadow-sm mx-auto "
                  placeholder="search user name"
                  value={search}
                  onChange={handleChange}
               />
               <button
                  className="bg-green-400 px-2 h-fit py-1 rounded-md "
                  onClick={handleClick}
               >
                  search
               </button>
            </div>
         </div>
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
               {searchResult?.map((post) => (
                  <tr key={post._id}>
                     <td className="w-1/4 border px-4 py-2">
                        {truncateSentence(post.title, 5)}
                     </td>
                     <td className="w-2/4 border px-4 py-2">
                        {truncateSentence(post.description, 10)}
                     </td>
                     <td className="w-1/4 border px-4 py-2">
                        {post.user.name}
                     </td>
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
