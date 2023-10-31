"use client"
import React from "react";

import { signOut } from "next-auth/react";

export default function Header() {
   return (
      <nav className="h-14 bg-gray-800 flex justify-end items-center">
         <button
            className="text-white bg-red-500 px-3 h-10 rounded-md absolute right-4 "
            onClick={() => {
               signOut();
            }}
         >
            logout
         </button>
      </nav>
   );
}
