import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export function PrivateRoute() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const isLoggedIn = () => {

            // axios.get(`${process.env.REACT_APP_API}/auth/user-auth`, 
            // {
            //     headers: {
            //         "Authorization": auth?.token
            //     }
            // })
            axios.get(`${process.env.REACT_APP_API}/auth/user-auth`)
                .then(response => {
                    if (response.data.success) {
                        setLoggedIn(true)
                    } else {
                        setLoggedIn(false)
                    }
                })
                .catch(error => {
                    setLoggedIn(false)
                })
        }

        if (auth?.token) {
            isLoggedIn()
        }

    }, [auth?.token])

    return loggedIn ? <Outlet /> : <Spinner />
}