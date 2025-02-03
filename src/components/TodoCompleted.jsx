import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { completeTodoAPI } from '../services/todoServices';
import { useFormik } from 'formik';

const TodoCompleted = ({title}) => {
  const [successMessage, setSuccessMessage] = useState(null);
   const queryClient=useQueryClient()
   const { mutateAsync, isLoading, isError, error,isSuccess } = useMutation({
     mutationFn:completeTodoAPI,
     mutationKey:["complete-todo"]
   });
   if(isSuccess){
     queryClient.invalidateQueries()
 }
  const { values, handleBlur, isSubmitting, touched, errors, handleChange, handleSubmit } = useFormik({
           initialValues: {
               title: title
           },
           onSubmit:(values,action)=>{
               mutateAsync(values).then((data)=>{
                   console.log(data);     
                   setSuccessMessage(data);                       
               })
           },
       }) 

  return (
    <button
      className="bg-gray-800 text-white p-3 ml-5 rounded-md text-lg"
      onClick={handleSubmit} type="button"
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Mark Complete'}
      
      {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
            {isSuccess && <div className='alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{successMessage}</div>}
       </button>
  )
}

export default TodoCompleted
