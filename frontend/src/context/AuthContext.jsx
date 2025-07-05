import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

            axios.get('/api/v1/auth/profile')
                .then((response) => {
                    setUser(response.data)
                })
        }
    }, [])

    const login = async (email, password) => {
        const response = await axios.post('/api/v1/auth/login', {
            email, password
        })
        localStorage.setItem("token", response.data.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`

        setUser(response.data)
    }
    const register = async (username, email, password) => {
        const response = await axios.post('/api/v1/auth/register', {
            username, email, password
        })
        localStorage.setItem("token", response.data.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`

        setUser(response.data)
    }
    const logout = () => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"]
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user, login, register, logout
        }}>
            {children}
        </AuthContext.Provider>
    )



}