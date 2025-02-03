import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
    const homeNav = ()=>{
        navigate("/")
    }
    const taskNav = ()=>{
      navigate("/tasks")
  }
  const diaryNav = ()=>{
    navigate("/diary")
}
const registerNav = ()=>{
  navigate("/register")
}
const [isToken,setisToken]=useState(false)
useEffect(() => {
  const token = localStorage.getItem('useToken');
  console.log("run");
  
  if(token){
  setisToken(true)
  console.log(isToken);
  
  }
}, []);

const handleLogout = () => {
  localStorage.clear() 
  setisToken(false)
  navigate('/'); 
};
  return (
    <div style={{ backgroundColor: '#2C3E50' }} className='h-15 py-3 text-right text-white text-lg'>
        <button className='px-2' onClick={homeNav}>Home</button>
        <button className='px-2' onClick={taskNav}>Task</button>
        <button className='px-2' onClick={diaryNav}>Diary</button>
        {/* <button className='px-2' onClick={()=>navigate('/logout')}>Logout</button> */}
        {isToken ? (
  <button onClick={handleLogout}>Logout</button>
) : (
  <>
    <button className='px-2' onClick={registerNav}>Register</button>
    <button className='px-2' onClick={() => navigate('/login')}>Login</button>
  </>
)}

    </div>
  )
}

export default Navbar
