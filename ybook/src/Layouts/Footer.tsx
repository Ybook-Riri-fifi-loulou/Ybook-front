import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from '../components/Login'
import {AiFillHome, AiOutlinePlus} from 'react-icons/ai'
import {MdOutlineMessage} from 'react-icons/md'

function Footer() {
    return (
        <>
            <div className="offcanvas offcanvas-end" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    {/* <h5 id="offcanvasRightLabel">Menu</h5> */}
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="navbar-burger-body">
                        <div className="navbar-burger-item">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="navbar-burger-item">
                            <a href="/login">Login</a>
                        </div>
                        <div className="navbar-burger-item">
                            <a href="/register">Register</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-fixed">
                <div className="footer-content">
                    <div className="footer-item">
                        <Link to="/"><AiFillHome size={30}/></Link>
                    </div>
                    <div className="footer-item" id="footer-center-button">
                        <Link to="/addpost"><AiOutlinePlus size={30} color="white"/></Link>
                    </div>
                    <div className="footer-item">
                        <Link to=""><MdOutlineMessage size={30}/></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer