import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Intro = () => {        
        const navigate = useNavigate()
        const queryClient=useQueryClient()
    const loginNav = ()=>{
        navigate("/login")
    }
  return (
    <div className="bg-yellow-500 text-gray-800 p-20 text-center py-40">
      <h3 className="text-3xl font-bold mb-5">Welcome to Your ToDo & Diary App!</h3>
      <p className="px-20 text-lg leading-relaxed mb-7 ">
        Stay organized and keep track of your tasks and personal thoughts all in one place. Whether you're planning your day or noting down memories, we're here to help you stay on top of everything.
      </p>
      <p className="text-lg leading-relaxed mb-7">
        Ready to get started? Click the button below to begin your journey.
      </p>
      <button 
        onClick={loginNav} 
        className="mt-5 bg-gray-800 text-yellow-500 py-4 px-8 text-lg font-bold rounded"
      >
        Start Now
      </button>
    </div>
  )
}

export default Intro
