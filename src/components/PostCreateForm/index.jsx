import { useForm } from "react-hook-form";

export const PostCreateForm = () => {
   const { register, handleSubmit } = useForm();

    const submit = (formData) => {
        
    }

    return(
        <form onSubmit={handleSubmit(submit)}>
            <input placeholder="Título" type="text" {...register("title")} />
            <input placeholder="Conteúdo" type="text" {...register("content")} />
            <input placeholder="Categoria" type="text" {...register("category")} />
            <button type="submit">Cadastrar uma nota</button>
        </form>
    )
}