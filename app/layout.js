import "./globals.css";
import { getServerSession } from "next-auth";

import Provider from "@/components/provider";

export const metadata = {
   title: "blog | admin",
   description: "blog admin dashboard",
};

export default async function RootLayout({ children }) {
   const session = await getServerSession();

   return (
      <html lang="en">
         <body suppressHydrationWarning={true}>
            <Provider>{children}</Provider>
         </body>
      </html>
   );
}
