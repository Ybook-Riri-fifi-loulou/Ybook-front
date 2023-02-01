import React from 'react'
import logo from '../assets/images/logo.png'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

function Header() {
    const { logout } = useAuth();

    return (
        <>
            <div className="header">
                <div className="header-content">
                    <div className="header-item">
                        <Link to='/profil'>
                            <HiOutlineUserCircle className='header-item__icon' />
                        </Link>
                    </div>
                    <div className="header-item">
                        <Link to='/'>
                            <img src={logo} alt="logo" className="img-fluid" width={40} loading='lazy'/>
                        </Link>
                    </div>
                    <div className="header-item">
                        <Link to='/login' onClick={logout}>
                            <AiOutlinePoweroff className='header-item__icon' />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header