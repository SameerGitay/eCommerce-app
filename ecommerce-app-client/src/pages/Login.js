import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
// import { AuthContext } from '../context/auth'
// import { useContext } from 'react'

import { useAuth } from '../hooks/useAuth'

import styles from '../styles/AuthStyles.module.css'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const emailRef = useRef()
    // const authContext = useContext(AuthContext)
    const [auth, setAuth] = useAuth()

    const [userDetails, setUserDetails] = useState({ email: "", password: "" })

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { email, password } = userDetails
        try {
            axios.post(`${process.env.REACT_APP_API}/auth/login`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {

                    if (response.data.success) {
                        toast.success('Login successful')
                        // authContext.setAuth({
                        //     user: response.data.data,
                        //     token: response.data.token
                        // })
                        setAuth({
                            user: response.data.data,
                            token: response.data.token
                        })
                        localStorage.setItem('auth', JSON.stringify({
                            ...auth,
                            user: response.data.data,
                            token: response.data.token
                        }))
                        setTimeout(() => {
                            navigate(location.state || '/')
                        }, 1000)
                    } else {
                        toast.error('Invalid login id or password')
                    }
                })
                .catch(error => {
                    console.log(error)
                    toast.error('Error in login')
                })
        } catch (error) {
            toast.error('Error in login')
        }
    }

    const handleForgotPassword = (e) => {
        navigate('/forgot-password')
    }
    return (
        <Layout>
            <div className={styles["form-container"]}>
                <form onSubmit={handleSubmit}>
                    <h4 className={styles.title}>LOGIN</h4>

                    <div className="form-floating mt-3">
                        <input name="email"
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Email address'
                            onChange={handleChange}
                            value={userDetails.email}
                            ref={emailRef}
                        />
                        <label htmlFor="exampleInputEmail">Email address</label>
                    </div>

                    <div className="form-floating mt-3">
                        <input name="password"
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Password'
                            onChange={handleChange}
                            value={userDetails.password}
                        />
                        <label htmlFor="exampleInputPassword1">Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                    <div>
                        <button type="button" className="btn btn-Link mt-3" onClick={handleForgotPassword} >Forgot password</button>
                    </div>

                </form>
            </div>

        </Layout>
    )
}

export default Login
