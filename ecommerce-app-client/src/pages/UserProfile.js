import React from "react";
import Layout from "../components/Layout/Layout";
import UserPanel from "../components/Layout/UserPanel";

const UserProfile = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserPanel />
          </div>
          <div className="col-md-9">
            <h1>Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
