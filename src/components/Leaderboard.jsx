import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { leaderBoardAPI } from '../services/userServices'

const Leaderboard = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const queryClient=useQueryClient()
  const {data:users,isError,error,isLoading,isPending,isSuccess} = useQuery({
    queryKey:["leaderboard"],
    queryFn:leaderBoardAPI
})
if(isSuccess){
  queryClient.invalidateQueries()
}
  return (
    
    
    <div className="flex flex-col items-center p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Leaderboard</h1>
      <div className="w-full max-w-2xl bg-yellow-500 rounded-lg shadow-lg p-5 flex flex-col">
       {/* <p>{users}</p>  */}
      {users?.map((element,index)=>(
        <div key={index} className="flex justify-between p-2 border-b border-gray-300 text-xl">
          <div className="text-white font-bold text-2xl">{index+1}</div>
          <div className="text-gray-800">{element.username}</div>
          <div className="text-gray-800 font-bold">{element.streaks}</div>
        </div>
         ))}        
      </div>
      
      {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
          
         
    </div>
   
  )
}

export default Leaderboard
