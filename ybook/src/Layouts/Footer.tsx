import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {AiFillHome, AiOutlinePlus} from 'react-icons/ai'
import {MdOutlineMessage} from 'react-icons/md'
import { FaUserFriends } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { BsChatLeftTextFill } from 'react-icons/bs'

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
                        <div className="navbar-burger-item">
                            <Link to="/friends">Amis</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-fixed">
                <div className="footer-content">
                    <div className="footer-item">
                        <Link to="/"><AiFillHome className='footer-item__icon' /></Link>
                    </div>
                    <div className="footer-item">
                        <Link to="/friends"><FaUserFriends className='footer-item__icon' /></Link>
                    </div>
                    <div className="footer-item footer-item__icon--center">
                        <Link to="/addpost"><AiOutlinePlus className='footer-item__icon' color='white' /></Link>
                    </div>
                    <div className="footer-item">
                        <Link to="/chat"><BsChatLeftTextFill className='footer-item__icon' /></Link>
                    </div>
                    <div className="footer-item">
                        <Link to='/settings'><IoSettings className='footer-item__icon' /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer