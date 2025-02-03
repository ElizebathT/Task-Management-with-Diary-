import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavbarLogin = () => {
    const navigate = useNavigate()
    const homeNav = ()=>{
        navigate("/")
    }
const registerNav = ()=>{
  navigate("/register")
}


  return (
    <div style={{ backgroundColor: '#2C3E50' }} className='h-15 py-3 text-right text-white text-lg'>
        <button className='px-2' onClick={homeNav}>Home</button>
        
    <button className='px-2' onClick={registerNav}>Register</button>
    <button className='px-2' onClick={() => navigate('/login')}>Login</button>
 </div>
  )
}

export default NavbarLogin
