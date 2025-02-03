import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { dailyTaskSchema } from '../schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDailyTaskAPI } from '../services/taskServices';

// const onSubmit = async (values, actions) => {
//     console.log(values);
//     // await new Promise((resolve) => setTimeout(resolve, 1000))

//     actions.resetForm()
// }

const AddDailyTask = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const queryClient=useQueryClient()
    const {mutateAsync,isError,error,isSuccess,isPending} = useMutation({
       mutationFn:addDailyTaskAPI,
       mutationKey:["add-task"] 
    })

    const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            tasktype: '',
            title: '',
            description: '',
            reminder: '',
        },
        validationSchema: dailyTaskSchema,
        onSubmit:async(values,action)=>{
            mutateAsync(values).then((data)=>{
                console.log(data);          
                setSuccessMessage(data);
            })
            
            action.resetForm()
        },
    })
    if(isSuccess){
        queryClient.invalidateQueries()
    }

    return (
        <div className="bg-yellow-500">
            <form onSubmit={handleSubmit} autoComplete='off' className="bg-yellow-500 text-gray-800 p-10 rounded-lg text-center max-w-lg mx-auto">
                <h3 className="text-2xl font-bold mb-5">Add a Daily Task</h3>

                <label htmlFor='tasktype' className="block text-lg font-semibold mb-2 text-left">Category</label>
                <input
                    value={values.tasktype}
                    onChange={handleChange}
                    id='tasktype'
                    type='text'
                    placeholder='Enter Category'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.tasktype && touched.tasktype ? 'border-2 border-red-700' : ''}`}
                />
                {errors.tasktype && touched.tasktype && <p className='error'>{errors.tasktype}</p>}

                <label htmlFor='title' className="block text-lg font-semibold mb-2 text-left">Title</label>
                <input
                    value={values.title}
                    onChange={handleChange}
                    id='title'
                    type='text'
                    placeholder='Enter task title'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.title && touched.title ? 'border-2 border-red-700' : ''}`}
                />
                {errors.title && touched.title && <p className='error'>{errors.title}</p>}

                <label htmlFor='description' className="block text-lg font-semibold mb-2 text-left">Description</label>
                <textarea
                    value={values.description}
                    onChange={handleChange}
                    id='description'
                    placeholder='Enter task description'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.description && touched.description ? 'border-2 border-red-700' : ''}`}
                />
                {errors.description && touched.description && <p className='error'>{errors.description}</p>}

                <label htmlFor='reminder' className="block text-lg font-semibold mb-2 text-left">Reminder</label>
                <input
                    value={values.reminder}
                    onChange={handleChange}
                    id='reminder'
                    type='time'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.reminder && touched.reminder ? 'border-2 border-red-700' : ''}`}
                />
                {errors.reminder && touched.reminder && <p className='error'>{errors.reminder}</p>}

                <button
                    type='submit' disabled={isSubmitting}
                    className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer'} w-full bg-gray-800 text-yellow-500 py-4 px-8 text-lg font-bold rounded-lg hover:bg-gray-700`}
                >
                    Submit
                </button>
            </form>
            {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
            {isSuccess && <div className='alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{successMessage}</div>}
        </div>        
    )
}

export default AddDailyTask
