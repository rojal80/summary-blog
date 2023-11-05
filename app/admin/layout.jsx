import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
   title: "blog | admin",
   description: "blog admin dashboard",
};

export default async function RootLayout({ children }) {
   const session = await getServerSession();
   if (!session) {
      redirect("/auth/login");
   }

   return (
      <html lang="en">
         <body className="">
            <div>
               <div className="flex flex-1 min-h-screen">
                  <div className="w-1/5 h-screen ">
                     <Sidebar />
                  </div>
                  <div className="flex-1">
                     <Header />
                     <main className="bg-slate-100  h-screen">{children}</main>
                  </div>
               </div>
            </div>
         </body>
      </html>
   );
}
