import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { searchTaskAPI } from '../services/taskServices';
import EditDailyTask from './EditDailyTask';
import DeleteTask from './DeleteTask';
import TaskCompleted from './TaskCompleted';
import { useFormik } from 'formik';

const SearchTask = () => {
    const {data:task,isError,error,isLoading,isPending,isSuccess} = useQuery({
        queryKey:["search-tasks"],
        queryFn:searchTaskAPI
    })
    const queryClient=useQueryClient()
    const [completed, setCompleted] = useState(false);
    const [completedTaskTitle, setCompletedTaskTitle] = useState('');
    const [editTask, seteditTask] = useState(false);
    if(isSuccess){
        queryClient.invalidateQueries()
    }
    const handleMarkComplete = (taskTitle) => {
        setCompleted(true);
        setCompletedTaskTitle(taskTitle);
    };
    return (
        <div className="bg-yellow-500 p-6">
            <form className="mb-6">
                <input
                    id='title'
                    type='text'
                    placeholder='Enter a title'
                    className=" p-3 border border-gray-300 rounded-md "
                />
                <button className='bg-gray-800 text-white h-full mx-5 p-3 rounded-md text-lg'>Search</button>
            </form>
            { task &&
            <div key={task.id} className="mb-4 p-2 rounded-md border border-gray-800 ">
                    <div className="flex justify-between items-center mb-4 " >
                        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                        <span className="text-sm px-3 py-1 bg-gray-800 text-white">{task.tasktype_id.tasktype_name}</span>
                    </div>
                    <p className="text-gray-900 mb-4">{task.description}</p>
                    <p className="text-gray-900 mb-4"><strong>Reminder:</strong> {task.reminder}</p>
                    
                    <div className="mt-4 pt-4  border-gray-200">
                            <h4 className="text-lg font-medium text-gray-800">Completion Details:</h4>
                            <div className="flex space-x-4">
                               
                                {task.completed?.map((detail, idx) => (
                                    <div key={idx} className="space-y-2 mt-2 text-gray-900">
                                        <p><strong>Start Time:</strong> {detail.start_time}</p>
                                        <p><strong>Completion Time:</strong> {detail.completion_time}</p>
                                    </div>
                                ))}
                            </div>
                    </div>
                    <button
                        className='bg-gray-800 text-white h-full ml-5 p-3 mt-3 rounded-md text-lg'
                        onClick={() =>seteditTask("true") }
                    >
                        Edit
                    </button>
                    {editTask && <EditDailyTask title={task.title}  description={ task.description} reminder={task.reminder} />}{/* <button className='bg-gray-800 text-white h-full ml-5 p-3 mt-3 rounded-md text-lg'>Delete</button> */}
                    <DeleteTask taskTitle={task.title} />
                    <button
                        className='bg-gray-800 text-white h-full ml-5 p-3 mt-3 rounded-md text-lg'
                        onClick={() => handleMarkComplete(task.title)}
                    >
                        Mark as Complete
                    </button>
                    {completed && <TaskCompleted title={completedTaskTitle} />}
                </div>
}

{isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
            
            
        </div>
    );
};
export default SearchTask
