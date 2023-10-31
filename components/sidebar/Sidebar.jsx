"use client";
import { useEffect } from "react";
import Link from "next/link";
import "@/assets/styles/sidebar.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/blog.jpg";

export default function Sidebar() {
   const pathname = usePathname();
   const itemName = pathname.split("/")[2]?.toLowerCase() || "dashboard";
   useEffect(() => {
      const sidebarItems = document.querySelectorAll(".sidebar-item");
      sidebarItems.forEach((item) => {
         const className = item.className.split(" ");
         if (className.includes(itemName)) {
            item.classList.add("active");
         } else {
            item.classList.remove("active");
         }
      });
   }, [itemName]);

   return (
      <div className="h-full">
         <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="logo"
         />
         <hr />
         <ul>
            <Link href="/admin">
               <li className="sidebar-item dashboard">Dashboard</li>
            </Link>
            <Link href="/admin/users">
               <li className="sidebar-item users">Users</li>
            </Link>
            <Link href="/admin/posts">
               <li className="sidebar-item posts">Posts</li>
            </Link>
         </ul>
      </div>
   );
}
