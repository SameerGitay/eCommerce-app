import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi"

const ContactUs = () => {
    return (
        <Layout>
            <div className='row contact-us'>
                <div className='col-12 col-md-6'>

                    <img src="/images/contactus.jpeg" alt="Contact Us" style={{ width: '100%' }} />

                </div>
                <div className='col-12 col-md-4'>
                    <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
                    <p className='text-justify mt-2'>Call anytime for any query or info about our products</p>
                    <p className='mt-3'>
                        <BiMailSend /> support@ecommerceapp.com
                    </p>
                    <p className='mt-3'>
                        <BiPhoneCall /> 012-3456789
                    </p>
                    <p className="mt-3">
                        <BiSupport /> : 1800-0000-0000 (toll free)
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default ContactUs