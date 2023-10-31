import React from "react";

export default function Card({ title, number }) {
   return (
      <div className="w-72 h-44 border border-green-600 shadow-md rounded-md">
         <h1 className="text-3xl font-normal text-blue-500">{title}</h1>
         <div className="my-6">
            <h1 className="text-2xl text-center font-normal text-gray-500">
               {number}
            </h1>
         </div>
      </div>
   );
}
