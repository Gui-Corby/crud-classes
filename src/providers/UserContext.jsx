import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const userId = localStorage.getItem("@USERID");
      const token = localStorage.getItem("@TOKEN");

      const autoLogin = async () => {
         try {
            setLoading(true);
            const { data } = await api.get(`/users/${userId}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setUser(data);
         } catch (error) {
            console.log(error);
            localStorage.removeItem("@USERID");
            localStorage.removeItem("@TOKEN");
         } finally {
            setLoading(false);
         }
         autoLogin();
      };

      if (userId && token) {
      }
   }, []);

   const userLogin = async (formData) => {
      try {
         const { data } = await api.post("/login", formData);
         setUser(data.user);
         localStorage.setItem("@USERID", data.user.id);
         localStorage.setItem("@TOKEN", data.accessToken);
         alert("Login efetuado com sucesso!");
      } catch (error) {
         console.log(error);
      }
   };

   const userRegister = async (formData) => {
      try {
         await api.post("/users", formData);
         alert("Cadastro efetuado com sucesso!");
      } catch (error) {
         console.log(error);
      }
   };

   const userLogout = () => {
      setUser(null);
      localStorage.removeItem("@USERID");
      localStorage.removeItem("@TOKEN");
   };

   return <UserContext.Provider value={{ user, loading, userLogin, userRegister, userLogout }}>{children}</UserContext.Provider>;
};
