import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { UserContext } from "./UserContext";
import { api } from "../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PostContext = createContext({});

export const PostProvider = ({ children }) => {
   const { user } = useContext(UserContext);

   const [editingPost, setEditingPost] = useState(null);

   const queryClient = useQueryClient();

   const {
      data: postList,
   } = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
         const { data } = await api.get("/news");
         return data;
      },
   });

   const revalidate = () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
   };

   const postCreateMutation = useMutation({
      mutationFn: async (formData) => {
         const newPost = { ...formData, author: user.name };

         const token = localStorage.getItem("@TOKEN");

         return await api.post("/news", newPost, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
      },
      onSuccess: revalidate,
   });

   const postCreate = async (formData) => {
      postCreateMutation.mutate(formData);
   };

   const postUpdateMutation = useMutation({
      mutationFn: async (formData) => {
         const token = localStorage.getItem("@TOKEN");

         return await api.patch(`/news/${editingPost.id}`, formData, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
      },
      onSuccess: () => {
         setEditingPost(null);
         revalidate();
      },
   });

   const postUpdate = async (formData) => {
      postUpdateMutation.mutate(formData);
   };

   const postDeleteMutation = useMutation({
      mutationFn: async (deletingId) => {
         const token = localStorage.getItem("@TOKEN");

         return await api.delete(`/news/${deletingId}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
      },
      onSuccess: () => {
         alert("Exclusão realizada com sucesso!");
         revalidate();
      }
   })

   const postDelete = async (deletingId) => {
     postDeleteMutation.mutate(deletingId);
   };

   return (
      <PostContext.Provider
         value={{
            postCreate,
            postUpdate,
            postDelete,
            postList,
            editingPost,
            setEditingPost,
         }}
      >
         {children}
      </PostContext.Provider>
   );
};
