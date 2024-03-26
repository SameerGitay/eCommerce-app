import React from 'react'
import Layout from '../components/Layout/Layout'
import UserPanel from '../components/Layout/UserPanel'
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserPanel />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>Name: {auth?.user?.firstName}</h3>
                            <h3>Email: {auth?.user?.email}</h3>
                            <h3>Contact: {auth?.user?.phoneNumber}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
