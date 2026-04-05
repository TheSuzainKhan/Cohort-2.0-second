// jo bhi hamne api layer and state layer me create kara tha unko yha lekar aate he.(HOOk LAYER ME)

import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.api"; // api layer ke andar jo create kara tha usko le aaye.

export const useAuth = () => { //useAuth ye hook he custom hook

    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context     // hook layer ke andar jo create kara tha use yha lekar aagye.


    const handleLogin = async (username, password) => {

        setLoading(true)

        const response = await login(username, password)

        setUser(response.user)

        setLoading(false)
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        
        const response = await register(username, email, password)
        setUser(response.user)

        setLoading(false)
    }

    return {
        user, loading, handleLogin, handleRegister
    }



}