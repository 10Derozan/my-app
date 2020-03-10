import React from 'react'
import './logo.scss'
import logo from './logo.png'

export default () => {
    return(
        <div className='logo-container'>
            <img src={logo} alt='logo' className='logo-img'></img>
        </div>
    )
}
