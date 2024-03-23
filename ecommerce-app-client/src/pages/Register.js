import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
// import { toast } from 'react-toastify'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Register () {

    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => { 

        // alert("Submit")
        try {
            e.preventDefault()

            const {firstName, lastName, email,password, address, phoneNumber} = userDetails

            axios.post(`${process.env.REACT_APP_API}/auth/register`, {
                firstName,
                lastName,
                email,
                password,
                address,
                phoneNumber
            }, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
            }).then(response => {
                if(response.data.success){
                    // alert("IF")
                    toast.success('Registered Successfully')
                    setTimeout(() => {
                        navigate('/login')
                    }, 1000);
                    
                }else{
                    // alert("ELSE")
                    toast.error("Error registering user")
                }
            })
            .catch(error => {
                // alert("AXIOS CATCH")
                toast.error("Error registering user")
                console.log(error)
            })

            // const res = await axios.post(`${process.env.REACT_APP_API}/auth/register`,{
            //     firstName,
            //     lastName,
            //     email,
            //     password,
            //     address,
            //     phoneNumber
            // },{
            //     headers:{
            //         'Content-Type': 'application/json'
            //     }
            // })

            // console.log("******************************")
            // console.log(JSON.stringify(res))
            // console.log("******************************")
            // if (res.data.success) {
            //     alert("AWIAT IF")
            //     toast.success('Registered Successfully')
            // } else {
            //     alert("AWIAT ELSE")
            //     toast.error('Error registering user')
            // }
        } catch (error) {
            // alert("MAIN CATCH")
            toast.error("Error registering user")
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='register'>
                Register

                <form onSubmit={handleSubmit}>
                    <div className="form-floating mt-3">
                        <input name="firstName"
                            type="text"
                            className="form-control"
                            id="exampleInputFirstName"
                            placeholder='First name'
                            onChange={handleChange}
                            value={userDetails.firstName} 
                            />
                        <label htmlFor="exampleInputFirstName">First name</label>
                    </div>

                    <div className="form-floating mt-3">
                        <input name="lastName"
                            type="text"
                            className="form-control"
                            id="exampleInputLastName"
                            placeholder='Last name'
                            onChange={handleChange}
                            value={userDetails.lastName} 
                            />
                        <label htmlFor="exampleInputLastName">Last name</label>
                    </div>

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

                    <div className="form-floating mt-3">
                        <input name="address"
                            type="text"
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder='Address'
                            onChange={handleChange}
                            value={userDetails.address} 
                            />
                        <label htmlFor="exampleInputAddress">Address</label>
                    </div>

                    <div className="form-floating mt-3">
                        <input name="phoneNumber"
                            type="text"
                            className="form-control"
                            id="exampleInputPhoneNumber"
                            placeholder='Phone number'
                            onChange={handleChange}
                            value={userDetails.phoneNumber} 
                            />
                        <label htmlFor="exampleInputPhoneNumber">Phone number</label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </Layout>
    )
}


