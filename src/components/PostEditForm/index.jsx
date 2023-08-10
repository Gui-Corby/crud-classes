import { useForm } from "react-hook-form";

export const PostEditForm = () => {
  const { register, handleSubmit } = useForm();

   const submit = (formData) => {
      
   };

   return (
      <div>
         <button>Fechar</button>
         <h2>Editando nota</h2>
         <form onSubmit={handleSubmit(submit)}>
            <input placeholder="Título" type="text" {...register("title")} />
            <input placeholder="Conteúdo" type="text" {...register("content")} />
            <input placeholder="Categoria" type="text" {...register("category")} />
            <button type="submit">Editar nota</button>
         </form>
      </div>
   );
};
