import React from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome, AiOutlinePlus} from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { BsChatLeftTextFill } from 'react-icons/bs'

function Footer() {
    return (
        <div className="footer-fixed">
            <div className="footer-content">
                <div className="footer-item">
                    <Link to="/"><AiFillHome className='footer-item__icon' /></Link>
                </div>
                <div className="footer-item">
                    <Link to="/friends"><FaUserFriends className='footer-item__icon' /></Link>
                </div>
                <div className="footer-item footer-item__icon--center">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}><AiOutlinePlus className='footer-item__icon' color='white' /></Link>
                </div>
                <div className="footer-item">
                    <Link to="/chat"><BsChatLeftTextFill className='footer-item__icon' /></Link>
                </div>
                <div className="footer-item">
                    <Link to='/settings'><IoSettings className='footer-item__icon' /></Link>
                </div>
            </div>
        </div>
    )
}

export default Footer