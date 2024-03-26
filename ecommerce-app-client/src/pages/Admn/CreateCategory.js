import React from "react";
import AdminPanel from "../../components/Layout/AdminPanel";
import Layout from "../../components/Layout/Layout";

const CreateCategory = () => {
  return (
    <Layout>
      <div className="container-fuild m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminPanel />
          </div>
          <div className="col-md-9">
            <h1>Create Category</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default CreateCategory;
