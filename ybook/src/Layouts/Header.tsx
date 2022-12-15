import React from 'react'
import logo from '../assets/images/logo.png'
import { AiOutlineMenu } from 'react-icons/ai'

function Header() {
    return (
        <>
            <div className="header">
                <div className="header-content">
                    <div className="header-item" id="header-logo">
                        <img src={logo} alt="logo" className="img-fluid" />
                    </div>
                    <div className="header-item" id="menu-burger">
                        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><AiOutlineMenu /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header