import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout/Layout'
import styles from '../styles/AuthStyles.module.css'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({ email: "", password: "", question: "", answer: "" })
    const [secretQuestions, setSecretQuestions] = useState([])
    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { email, password, question, answer } = userDetails

        axios.post(`${process.env.REACT_APP_API}/auth/forgot-password`, {
            email,
            password,
            question,
            answer
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.success) {
                    toast.success('Password reset successfully')
                    setTimeout(() => {
                        navigate('/login')
                    }, 1000)
                } else {
                    toast.error('Could not reset password')
                }
            })
            .catch(error => {
                toast.error("Something went wrong")
                console.log(error)
            })
    }

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}/auth/secret-options`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.success) {
                    setSecretQuestions(response.data.data)
                    setUserDetails({ ...userDetails, question: response.data.data[0] })
                } else {
                    toast.error("Something went wrong")
                }
            })
            .catch(error => {
                toast.error("Something went wrong")
                console.log(error)
            })
    }, [])

    return (
        <Layout>
            <div className={styles["form-container"]}>
                <form onSubmit={handleSubmit}>
                    <h4 className={styles.title}>RESET PASSWORD</h4>

                    <div className="form-floating mt-3">
                        <input name="email"
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder='Email address'
                            onChange={handleChange}
                            value={userDetails.email}
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

                    <select name="question" className="form-select mt-4" aria-label="Secret Question" value={userDetails.question} onChange={handleChange}>
                        {
                            secretQuestions.map((i) => {
                                return (<option key={i} value={i}>{i}</option>)
                            })
                        }
                    </select>
                    <div className="form-floating mt-3">
                        <input name="answer"
                            type="text"
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder='Answer'
                            onChange={handleChange}
                            value={userDetails.answer}
                        />
                        <label htmlFor="exampleInputAnswer">Answer</label>
                    </div>

                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary mt-3">Reset</button>
                    </div>

                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
