"use client";
import { createContext, useReducer, useEffect } from "react";
import FarmReducer from "./Reducer";

const BlogContext = createContext();

function BlogContextProvider({ children }) {
  const initialValues = {
    pendingPosts: [],
    posts: [],
    users: [],
  };

  //for managing global state
  const [state, dispatch] = useReducer(FarmReducer, initialValues);

  //fetches post that is still in pending state
  const fetchPendingPosts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?status=pending`
      );
      const pendingPosts = await res.json();
      dispatch({ type: "MANAGE_PENDING_POSTS", payload: pendingPosts });
    } catch (err) {
      console.log(err);
    }
  };

  //fetch number of posts
  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?status=accepted`
      );
      const posts = await res.json();
      dispatch({ type: "MANAGE_POSTS", payload: posts });
    } catch (err) {
      console.log(err);
    }
  };

  //fetches all the users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`);
      const users = await res.json();
      dispatch({ type: "MANAGE_USERS", payload: users });
    } catch (err) {
      console.log(err);
    }
  };

  //accept or reject post
  const changeStatus = async (id, status) => {
    try {
      console.log(id, status);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.status === 200) fetchPendingPosts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPendingPosts();
    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{ ...state, fetchPendingPosts, fetchUsers, changeStatus }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export default BlogContext;
export { BlogContextProvider };
