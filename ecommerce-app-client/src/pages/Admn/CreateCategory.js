import React from "react";
import AdminPanel from "../../components/Layout/AdminPanel";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryTable from "../../components/Admin/CategoryTable"
import CategoryForm from "../../components/Admin/CategoryForm"

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      axios.post(`${process.env.REACT_APP_API}/category/create-category`, {
        name: categoryName
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.data.success) {
            console.log('Category created ')
            console.log(response)
            console.log(response.data.data)

            setCategoryName('')
            getAllCategories()
            // toast.success(`${categoryName} saved successfully`)
            // setCategories(prevCatagories => [...prevCatagories, ...response.data.data])
          } else {
            toast.error('Could not create category')
            console.log(response.data.msg)
          }
        })
        .catch(error => {
          toast.error("Something went wrong")
          console.log(error)
        })
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  const getAllCategories = async () => {
    try {
      axios.post(`${process.env.REACT_APP_API}/category`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.data.success) {
            console.log("Categories...")
            console.log(response.data.data)
            setCategories(response.data.data)
            // setCategories((prevCatagories) => [...prevCatagories, ...response.data.data])
          } else {
            toast.error('Error retrieving categories')
          }
        })
        .catch(error => {
          toast.error('Something went wrong')
          console.log(error)
        })
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    }
  }
  useEffect(() => {
    getAllCategories()

  }, [])

  return (
    <Layout>
      <div className="container-fuild m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminPanel />
          </div>
          <div className="col-md-9">
            <div className="col-md-9">
              <h1>Manage Category</h1>
              <div className="p-3">
                <CategoryForm handleSubmit={handleSubmit}
                  categoryName={categoryName}
                  setCategoryName={setCategoryName} />
              </div>
            </div>
            <CategoryTable categories={categories} />
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default CreateCategory;
