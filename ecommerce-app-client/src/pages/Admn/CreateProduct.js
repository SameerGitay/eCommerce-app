import React from "react";
import AdminPanel from "../../components/Layout/AdminPanel";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
// import Select from "react-select";

const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [photo, setPhoto] = useState("");
  const [productDetails, setProductDetails] = useState({})

  const { Option } = Select

  const handleCreate = (e) => {
    try {
      e.preventDefault()
      // alert(JSON.stringify(productDetails))
      const productData = new FormData()
      productData.append("name", productDetails.name)
      productData.append("description", productDetails.description)
      productData.append("quantity", productDetails.quantity)
      productData.append("shipping", productDetails.shipping)
      productData.append("price", productDetails.price)
      productData.append("category", categoryName)
      productData.append("photo", productDetails.photo)

      axios.post(`${process.env.REACT_APP_API}/product/create-product`, productData)
        .then(response => {
          if (response.data.success) {
            toast.success("Product created successfully")
          } else {
            toast.error("Error creating product");
          }
        })
        .catch(error => {
          console.log(error);
          toast.error("something went wrong");
        })

    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
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
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select"
                value={categoryName}
                onChange={value => setCategoryName(value)} >
                {categories.map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
              {/* <Select
                defaultValue={categoryName}
                onChange={setCategoryName}
                options={categories}
              /> */}


              <div className="mb-3 mt-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {productDetails.photo ? productDetails.photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setProductDetails({ ...productDetails, photo: e.target.files[0] })}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {
                  productDetails.photo && (
                    <div className="text-center">
                      <img src={URL.createObjectURL(productDetails.photo)}
                        alt="product-photo"
                        height={'200px'}
                        className="img img-responsive" />
                    </div>
                  )
                }
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={productDetails.name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="text"
                  value={productDetails.description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={productDetails.price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={productDetails.quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setProductDetails({ ...productDetails, quantity: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setProductDetails({ ...productDetails, shipping: value === '1' });
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
