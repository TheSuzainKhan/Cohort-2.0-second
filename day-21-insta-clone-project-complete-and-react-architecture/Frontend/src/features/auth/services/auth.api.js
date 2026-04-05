import axios from "axios"


//api ka instance create karenge.
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true // isse cookies ke andar jo token he frontend use read kar sakta he.
})

//jo backend par api he uske liye function banaynge.

//ye function login api se interact karta he.
export async function login(username, password) {
    const response = await api.post("/login", {
        username, password
    })


    return response.data
}

//ye function register api se interact karta he.
export async function register(username, email, password) {

    const response = await api.post("/register", {
        username,email, password
    })

    return response.data
}

//get-me api se interact karne ke liye function
export async function getMe() {
    const response = await api.get("/get-me")

    return response.data
}

