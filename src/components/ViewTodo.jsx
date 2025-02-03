import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getTodosAPI } from '../services/todoServices'
import DeleteTodo from './DeleteTodo';
import EditTodo from './EditTodo';
import TodoCompleted from './TodoCompleted';

const ViewTodo = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const {data:tasks,isError,error,isLoading,isPending,isSuccess} = useQuery({
        queryKey:["get-all-todos"],
        queryFn:getTodosAPI
    })
    const queryClient=useQueryClient()
    if(isSuccess){
        queryClient.invalidateQueries()
    }
    const [editTask, seteditTask] = useState(false);
    
    
  return (
    <div className="bg-yellow-500 p-6">
            {/* {isError  && <></>} */}
            {tasks?.map((task, index) => (
                <div key={index} className="mb-4 p-2 rounded-md border border-gray-800 ">
                    <div className="flex justify-between items-center mb-4 " >
                        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                        <span className="text-sm px-3 py-1 bg-gray-800 text-white">{task.tasktype_id.tasktype_name}</span>
                    </div>
                    <p className="text-gray-900 mb-4">{task.description}</p>
                    <p className="text-gray-900 mb-4 text-lg ">
  <strong>Reminder:</strong> {new Date(task.reminder).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}
</p>

                    <button
                        className='bg-gray-800 text-white h-full ml-5 p-3 mt-3 rounded-md text-lg'
                        onClick={() =>seteditTask("true") }
                    >
                        Edit
                    </button>
                    {editTask && <EditTodo title={task.title}  description={ task.description} reminder={task.reminder} />}
                     {/* <button className='bg-gray-800 text-white h-full ml-5 p-3 mt-3 rounded-md text-lg'>Delete</button> */}
                     
                      <DeleteTodo taskTitle={task.title} /> 
                     
                     <TodoCompleted title={task.title} />
                </div>
            ))}
            
            {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
           
       </div>
  )
}

export default ViewTodo
