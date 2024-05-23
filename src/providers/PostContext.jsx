import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { UserContext } from "./UserContext";
import { api } from "../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PostContext = createContext({});

export const PostProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [editingPost, setEditingPost] = useState(null);

  const { data: postList } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get("/news");
      return data;
    },
  });

  const client = useQueryClient();

  const revalidate = () => {
    client.invalidateQueries({ queryKey: ["posts"]})
  }

  const postCreate = useMutation({
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

 

  const postUpdate = useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem("@TOKEN");

      return await api.patch(`/news/${editingPost.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      setEditingPost(null);
      revalidate();
    }
  })


  const postDelete = useMutation({
    mutationFn: async (deletingId) => {
      const token = localStorage.getItem("@TOKEN");

      return await api.delete(`/news/${deletingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      alert("Exclusão realizada com sucesso!");
      revalidate();
    }
  })

  return (
    <PostContext.Provider
      value={{
        postCreate,
        postDelete,
        postUpdate,
        postList,
        editingPost,
        setEditingPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
