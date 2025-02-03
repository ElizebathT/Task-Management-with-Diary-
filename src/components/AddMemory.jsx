import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { memorySchema } from '../schemas' 
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addMemoryAPI } from '../services/memoryServices'

const AddMemory = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const queryClient=useQueryClient()
    const {mutateAsync,isError,error,isSuccess,isPending} = useMutation({
        mutationFn:addMemoryAPI,
        mutationKey:["add-memory"] 
     })
     if(isSuccess){
        queryClient.invalidateQueries()
    }
    const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            category: '',
            title: '',
            mood_score: 0,
            note: '',
            location: '',
            date: '', 
        },
        validationSchema: memorySchema, 
        onSubmit:(values,action)=>{
            mutateAsync(values).then((data)=>{
                console.log(data);    
                setSuccessMessage(data);                 
            })            
            action.resetForm()
        },
    })

    const navigate = useNavigate()
    const memoriesNav = () => {
        navigate("/memories") 
    }

    return (
        <div className="bg-yellow-500">
            <form onSubmit={handleSubmit} autoComplete='off' className="bg-yellow-500 text-gray-800 p-10 rounded-lg text-center max-w-lg mx-auto">
                <h3 className="text-2xl font-bold mb-5">Add a New Memory</h3>

                <label htmlFor='category' className="block text-lg font-semibold mb-2 text-left">Category</label>
                <input
                    value={values.category}
                    onChange={handleChange}
                    id='category'
                    type='text'
                    placeholder='Enter memory category'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.category && touched.category ? 'border-2 border-red-700' : ''}`}
                />
                {errors.category && touched.category && <p className='error'>{errors.category}</p>}

                <label htmlFor='title' className="block text-lg font-semibold mb-2 text-left">Title</label>
                <input
                    value={values.title}
                    onChange={handleChange}
                    id='title'
                    type='text'
                    placeholder='Enter memory title'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.title && touched.title ? 'border-2 border-red-700' : ''}`}
                />
                {errors.title && touched.title && <p className='error'>{errors.title}</p>}

                <label htmlFor='mood_score' className="block text-lg font-semibold mb-2 text-left">Mood Score</label>
                <select
                    value={values.mood_score}
                    onChange={handleChange}
                    id='mood_score'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.mood_score && touched.mood_score ? 'border-2 border-red-700' : ''}`}
                >
                    <option value="">Select Mood</option>
                    <option value="1">Sad</option>
                    <option value="2">Slightly Sad</option>
                    <option value="3">Neutral</option>
                    <option value="4">Slightly Happy</option>
                    <option value="5">Happy</option>
                </select>
                {errors.mood_score && touched.mood_score && <p className='error'>{errors.mood_score}</p>}

                <label htmlFor='note' className="block text-lg font-semibold mb-2 text-left">Note</label>
                <textarea
                    value={values.note}
                    onChange={handleChange}
                    id='note'
                    placeholder='Enter your note'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.note && touched.note ? 'border-2 border-red-700' : ''}`}
                />
                {errors.note && touched.note && <p className='error'>{errors.note}</p>}

                <label htmlFor='location' className="block text-lg font-semibold mb-2 text-left">Location</label>
                <input
                    value={values.location}
                    onChange={handleChange}
                    id='location'
                    type='text'
                    placeholder='Enter memory location'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.location && touched.location ? 'border-2 border-red-700' : ''}`}
                />
                {errors.location && touched.location && <p className='error'>{errors.location}</p>}

                <label htmlFor='date' className="block text-lg font-semibold mb-2 text-left">Date</label>
                <input
                    value={values.date}
                    onChange={handleChange}
                    id='date'
                    type='date'
                    onBlur={handleBlur}
                    className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.date && touched.date ? 'border-2 border-red-700' : ''}`}
                />
                {errors.date && touched.date && <p className='error'>{errors.date}</p>}

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

export default AddMemory
