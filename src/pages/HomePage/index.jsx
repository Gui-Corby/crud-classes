import { useContext } from "react"
import { UserContext } from "../../providers/UserContext"
import { LogoutView } from "./LogoutView";
import { LoginView } from "./LoginView";

export const HomePage = () => {
    const { user } = useContext(UserContext);
    return(
        <main>
            {user ? <LoginView /> : (
                <LogoutView />
            )}
        </main>
    )
}