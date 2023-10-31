"use client";
import { BlogContextProvider } from "./context/BlogContext";

import React from "react";

export default function provider({ children }) {
   return <BlogContextProvider>{children}</BlogContextProvider>;
}
