import { useState } from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query'
import { getAllTaskAPI } from '../services/taskServices';
import TaskCompleted from './TaskCompleted';
import DeleteTask from './DeleteTask';
import EditDailyTask from './EditDailyTask';
import { useNavigate } from 'react-router-dom';

const DailyTasks = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const queryClient=useQueryClient()
    const {data:tasks,isError,error,isLoading,isPending,isSuccess} = useQuery({
        queryKey:["get-all-daily-tasks"],
        queryFn:getAllTaskAPI
    })
    if(isSuccess){
        queryClient.invalidateQueries()
    }
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate()
    const [completedTaskTitle, setCompletedTaskTitle] = useState('');
    const [editTask, seteditTask] = useState(false);
    
    const handleMarkComplete = (taskTitle) => {
        setCompleted(true);
        setCompletedTaskTitle(taskTitle);
    };
    return (
        <div className="bg-yellow-500 p-6">
            {/* {isError  && <></>} */}
            {tasks?.map((task, index) =>  (
                <div key={index} className="mb-4 p-2 rounded-md border border-gray-800 ">
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
                        onClick={() => navigate('/editTask', { state: { title: task.title, description: task.description, reminder: task.reminder } })}
                    >
                        Edit
                    </button>
                    {/* {editTask && <EditDailyTask title={task.title}  description={ task.description} reminder={task.reminder} />}<button className='bg-gray-800 text-white h-full ml-5 p-3 mt-3 rounded-md text-lg'>Delete</button> */}
                    <DeleteTask taskTitle={task.title} />
                    <button
                        className='bg-gray-800 text-white h-full ml-5 p-3 mt-3 rounded-md text-lg'
                        onClick={() => handleMarkComplete(task.title)}
                    >
                        Mark as Complete
                    </button>
                    {completed && <TaskCompleted title={completedTaskTitle} />}
                </div>
            ))}
            
            {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
           
       </div>
    );
};

export default DailyTasks;
