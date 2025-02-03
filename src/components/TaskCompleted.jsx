import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import {useFormik} from 'formik'
import { taskCompleteSchema } from '../schemas';
import { completeTaskAPI } from '../services/taskServices';


const TaskCompleted = ({title}) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const queryClient=useQueryClient()
  const {mutateAsync,isError,error,isPending,isSuccess}=useMutation({
    mutationFn: completeTaskAPI,
    mutationKey:["complete-task"]
})
if(isSuccess){
  queryClient.invalidateQueries()
}
const {values, handleBlur, isSubmitting,touched, errors,handleChange,handleSubmit} = useFormik({
    initialValues: {
        title:title,
        start_time: '',
        completion_time: ''
    },
    validationSchema:taskCompleteSchema,
    onSubmit:(values,action)=>{
        mutateAsync(values).then((data)=>{
            console.log(data); 
            setSuccessMessage(data);              
            action.resetForm()               
        })                   
        
    }
})

  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="flex items-center space-x-4">
    <div className="w-1/3"> 
      <label htmlFor='start_time' className="block text-lg font-semibold mb-2 text-left">Start time</label>
      <input
        value={values.start_time}
        onChange={handleChange}
        id='start_time'
        type='time'
        placeholder='Enter Start Time'
        onBlur={handleBlur}
        className={`p-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.start_time && touched.start_time ? 'border-2 border-red-700' : ''}`}
      />
      {errors.start_time && touched.start_time && <p className='error'>{errors.start_time}</p>}
    </div>

    <div className="w-1/3"> 
      <label htmlFor='completion_time' className="block text-lg font-semibold mb-2 text-left">Completion time</label>
      <input
        value={values.completion_time}
        onChange={handleChange}
        id='completion_time'
        type='time'
        placeholder='Enter Completion time'
        onBlur={handleBlur}
        className={`p-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.completion_time && touched.completion_time ? 'border-2 border-red-700' : ''}`}
      />
      {errors.completion_time && touched.completion_time && <p className='error'>{errors.completion_time}</p>}
    </div>

    <button type="submit" className="bg-gray-800 text-white h-full p-3 mt-10 rounded-md text-lg w-1/7">
      Submit
    </button>
  </div>
</form>


{isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
            {isSuccess && <div className='alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{successMessage}</div>}
       
    </div>
  )
}

export default TaskCompleted
