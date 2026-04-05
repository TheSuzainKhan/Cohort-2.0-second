import React from 'react'
import "./nav.scss"
import DateTime from './DateTime'

const Nav = () => {
    const assetBase = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`

    return (
        <nav>
            <div className="left">
                <div className="apple-icon">
                    <img src={`${assetBase}navbar-icons/apple.svg`} alt="" />
                </div>

                <div className="nav-item">
                    <p>Suzain Khan</p>
                </div>

                <div className="nav-item">
                    <p>File</p>
                </div>
                <div className="nav-item">
                    <p>Window</p>
                </div>
                <div className="nav-item">
                    <p>Terminal</p>
                </div>

            </div>
            <div className="right">
                <div className="nav-icon">
                    <img src={`${assetBase}navbar-icons/wifi.svg`} alt="" />
                </div>
                <div className="nav-item">
                    <DateTime />
                </div>

            </div>
        </nav>
    )
}

export default Nav
