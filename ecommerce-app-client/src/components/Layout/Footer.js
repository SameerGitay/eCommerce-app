import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='footer'>
            <h4 className='text-center'>
                All rights reserved &copy;
            </h4>
            <p className="text-center mt-3">
                <Link to="/about">About</Link>|
                <Link to="/policy">Privacy Policy</Link>|
                <Link to="/contact">Contact Us</Link>
            </p>
        </div>
    )
}
