import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = ({ path = "/login" }) => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((previousCount) => previousCount - 1)
        }, 1000)

        count === 0 && navigate(`${path}`, {
            state: location.pathname
        })

        return () => clearInterval(interval)
    }, [count, location, path])
    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>

                <h1>Redirecting in {count} seconds </h1>

                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner
