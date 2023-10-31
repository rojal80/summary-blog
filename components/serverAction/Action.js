"use server";
import { signIn } from "next-auth/react";

export async function handleSubmit(data) {
   const credentials = {
      email: data.get("email"),
      password: data.get("password"),
   };
   console.log("credentials", credentials);
   // const res = await signIn("credentials", credentials);
   // console.log("response");
   // console.log(res);
}
