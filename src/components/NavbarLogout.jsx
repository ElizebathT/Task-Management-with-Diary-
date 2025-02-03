import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutAction } from '../redux/authSlice'

const NavbarLogout = () => {
    const navigate = useNavigate()
    const queryClient=useQueryClient()
    const dispatch = useDispatch()
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

const handleLogout = () => {
  localStorage.clear() 
  dispatch(logoutAction())
  queryClient.invalidateQueries()
  navigate('/login'); 
};
  return (
    <div style={{ backgroundColor: '#2C3E50' }} className='h-15 py-3 text-right text-white text-lg'>
        <button className='px-2' onClick={homeNav}>Home</button>
        <button className='px-2' onClick={taskNav}>Task</button>
        <button className='px-2' onClick={diaryNav}>Diary</button>
        <button className='px-2' onClick={()=>navigate('/todo')}>Todo</button>
  <button onClick={handleLogout}>Logout</button>

    </div>
  )
}
export default NavbarLogout
