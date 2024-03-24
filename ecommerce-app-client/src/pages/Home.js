import React from 'react'
import Layout from '../components/Layout/Layout'
// import { useContext } from 'react'
// import { AuthContext } from '../context/auth'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
    // const authContext = useContext(AuthContext)
    const [auth, setAuth] = useAuth()
    return (
        // <Layout title='Ecommerce - Best offers'>
        <Layout>
            <h1>Home page</h1>
            {/* {JSON.stringify(authContext.auth)} */}

            {JSON.stringify(auth)}
        </Layout>
    )
}
