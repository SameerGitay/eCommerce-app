import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminPanel from "../../components/Layout/AdminPanel";
import { useAuth } from "../../hooks/useAuth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminPanel />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name: {auth?.user?.firstName}</h3>
              <h3>Email: {auth?.user?.email}</h3>
              <h3>Contact: {auth?.user?.phoneNumber}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
