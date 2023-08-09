import { useContext } from "react"
import { UserContext } from "../../../providers/UserContext"

export const LoginView = () => {
    const { user, userLogout } = useContext(UserContext);
    return(
        <div>
            <h2>Seja muito bem vindo {user.name} - {user.email}</h2>
            <button onClick={userLogout}>Sair</button>
        </div>
    )
}