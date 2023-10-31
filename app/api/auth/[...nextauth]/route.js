import NextAuth from "next-auth";
import connectDB from "@/config/database";
import CredentialsProvider from "next-auth/providers/credentials";
import AdminModel from "@/models/AdminModel";

const authOptions = {
   session: {
      strategy: "jwt",
   },
   providers: [
      CredentialsProvider({
         type: "credentials",
         credentials: {},
         async authorize(credentials, req) {
            const { email, password } = credentials;

            // await connectDB();
            const details = await AdminModel.findOne({ email });
            if (details.password === password) {
               return details;
            } else {
               return null;
            }
         },
      }),
   ],
   pages: {
      signIn: "/auth/login/",
   },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
