import axios from "axios";
import React, { useState, useEffect } from "react";


export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: "" })

    // axios default
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        let result = localStorage.getItem('auth')
        if (result) {
            result = JSON.parse(result)
            setAuth({
                ...auth,
                user: result.user,
                token: result.token
            })
        }
    }, [])

    return (
        // <AuthContext.Provider value={{ auth, setAuth }}>
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}