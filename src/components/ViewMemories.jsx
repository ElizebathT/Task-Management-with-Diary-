import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { getMemoriesAPI } from '../services/memoryServices';
import EditMemory from './EditMemory';
import DeleteMemory from './DeleteMemory';

const ViewMemories = () => {
    const {data:memories,isError,error,isLoading,isPending,isSuccess} = useQuery({
        queryKey:["get-all-memories"],
        queryFn:getMemoriesAPI
    })
    const queryClient=useQueryClient()
    const [editMemory, seteditMemory] = useState(false);
    const getMood = (score) => {            
        switch(score) {
          case 1:
            return 'Sad';
          case 2:
            return 'Slightly Sad';
          case 3:
            return 'Neutral';
          case 4:
            return 'Slightly Happy';
          case 5:
            return 'Happy';
          default:
            return 'Unknown Mood';
        }
      };
      if(isSuccess){
        queryClient.invalidateQueries()
    }
  return (
    <div className="bg-yellow-500 p-6">
            {/* {isError  && <></>} */}
            {memories?.map((memory, index) => (
                <div key={index} className="mb-4 p-2 rounded-md border border-gray-800 ">
                    <div className="flex justify-between items-center mb-4 " >
                        <h3 className="text-xl font-semibold text-gray-800">{memory.title}</h3>
                        
                    </div>
                    
                    <p className="text-gray-900 mb-4">{memory.note}</p>
                    <p className="text-gray-900 mb-4"><strong>Date:</strong> {new Date(memory.date).toLocaleDateString()}</p>
                    <p className="text-gray-900 mb-4"><strong>Location:</strong> {memory.location}</p>

                    <p className="text-gray-900 mb-4"><strong>Mood:</strong> {getMood(memory.mood_score)}</p>
                    <button
                        className='bg-gray-800 text-white h-full ml-5 p-3 mt-3 rounded-md text-lg'
                        onClick={() =>seteditMemory("true") }
                    >
                        Edit
                    </button>
                    {editMemory && <EditMemory category={memory.category} title={memory.title} mood_score={memory.mood_score} note={memory.note} location={memory.location} date={memory.date}/>}
                    <DeleteMemory title={memory.title} />
                    
                </div>
            ))}
            
            {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
            
       </div>
    );
};


export default ViewMemories
