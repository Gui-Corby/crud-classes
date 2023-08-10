import { useContext } from "react";
import { createContext, useState } from "react";
import { UserContext } from "./UserContext";
import { api } from "../services/api";

export const PostContext = createContext({});

export const PostProvider = ({ children }) => {
   const { user } = useContext(UserContext);

   const [postList, setPostList] = useState([]);

   console.log(postList);

   const postCreate = async (formData) => {
      try {
         const newPost = { ...formData, author: user.name };

         const token = localStorage.getItem("@TOKEN");

         const { data } = await api.post("/news", newPost, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         setPostList([...postList, data]);
      } catch (error) {
         console.log();
      }
   };

   return <PostContext.Provider value={{ postCreate }}>{children}</PostContext.Provider>;
};
