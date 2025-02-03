import { useQueryClient } from '@tanstack/react-query'
import { useField } from 'formik'
import React from 'react'

const CustomInput = ({label, ...props}) => {
    const [field,meta]=useField(props)
    const queryClient=useQueryClient()
  return (
    <>
        <label className='block text-lg font-semibold mb-2 text-left'>{label}</label>
        <input {...field}{...props}
        className={`p-4 mb-4 w-full bg-gray-100 rounded-lg ${meta.touched && meta.error ? 'border-2 border-red-700 ' : ''}`}/>
        {meta.touched && meta.error && <p className='error'>{meta.error}</p>}
    </>
  )
}

export default CustomInput
