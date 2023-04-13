import React from 'react'
import "./css/header.css"
const Header = () => {
  return (
    <div className='header'>
        <div className='header-container'>
            <div className='header-left'>
               <a href='/'><img src='./images/logo.png' alt='logo'/></a> 
                <input type='text' placeholder='Servis adi veya Servis No ile ara'/>
                <a href='#'>ara</a>
            </div>
            <div className='header-right'>
                <a href='login'>Giriş Yap</a>
                <a href='register'>Üye Ol</a>
            </div>
        </div>
    </div>
  )
}

export default Header