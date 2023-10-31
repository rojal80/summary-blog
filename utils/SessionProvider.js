import { getServerSession } from "next-auth";

export default async function getSessionInfo() {
   const session = await getServerSession();
   return session;
}
