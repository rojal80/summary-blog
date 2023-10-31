"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const response = await signIn("credentials", {
         email: formData.get("email"),
         password: formData.get("password"),
         redirect: false,
      });
      console.log("response", response);
      if (response.status === 401) {
         alert("email or password not correct");
      } else if (response.status === 200) {
         // redirect("/admin");
         router.push("/admin");
         router.refresh();
      }
   };

   return (
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
         <form onSubmit={handleSubmit}>
            <div className="w-[500px] h-72 border shadow-lg rounded-md ">
               <h1 className="text-2xl text-blue-950 font-medium text-center underline">
                  Login
               </h1>
               <div className="h-full flex flex-col justify-center gap-3 relative bottom-5">
                  <div>
                     <input
                        className="bg-gray-100 w-full py-3 focus:outline-gray-500 px-3 "
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                     />
                  </div>
                  <div>
                     <input
                        className="bg-gray-100 w-full py-3 focus:outline-gray-500 px-3 "
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                     />
                  </div>
                  <button
                     type="submit"
                     className="text-xl bg-gray-300 py-3 text-blue-950"
                  >
                     login
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
}
