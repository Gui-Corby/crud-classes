import { useContext } from "react"
import { UserContext } from "../../../providers/UserContext"
import { PostCreateForm } from "../../../components/PostCreateForm";
import { PostList } from "../../../components/PostList";
import { PostEditForm } from "../../../components/PostEditForm";

export const LoginView = () => {
    const { user, userLogout } = useContext(UserContext);  

    return(
        <div>
            <h2>Seja muito bem vindo {user.name} - {user.email}</h2>
            <button onClick={userLogout}>Sair</button>
            <PostCreateForm />
            <PostEditForm />
            <PostList />            
        </div>
    )
}