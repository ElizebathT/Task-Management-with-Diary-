import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { basicSchema } from '../schemas'
import { useMutation } from '@tanstack/react-query'
import { registerUserAPI } from '../services/userServices'
import { jwtDecode } from "jwt-decode";
import { registerUserAction } from '../redux/authSlice'
import { useDispatch } from 'react-redux'

// const onSubmit=async (values, actions)=>{
//     console.log(values);
//     // console.log(actions);
//     await new Promise((resolve) =>setTimeout(resolve,1000))
//     actions.resetForm()
//     // console.log('Submitted');        
// }
const Register = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const {mutateAsync,isError,error,isPending,isSuccess}=useMutation({
        mutationFn:registerUserAPI,
        mutationKey:["register-user"]
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const {values, handleBlur, isSubmitting,touched, errors,handleChange,handleSubmit} = useFormik({
        initialValues: {
            username:'',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema:basicSchema,
        onSubmit:(values,action)=>{
            mutateAsync(values).then((data)=>{
               localStorage.setItem("userToken",data.token)
                const decodedData = jwtDecode(data.token)
                dispatch(registerUserAction(decodedData))       
                setSuccessMessage(data);         
                action.resetForm()
                navigate("/")                
            })                   
            
        }
    })
    
    // console.log(formik);
    
    return (
        <div className="bg-yellow-500 ">
        <form onSubmit={handleSubmit} autoComplete='off' className="bg-yellow-500 text-gray-800 p-10 rounded-lg text-center max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-5">Create an Account</h3>
            
            <label htmlFor='email' className="block text-lg font-semibold mb-2 text-left">Email</label>
            <input 
                value={values.email} 
                onChange={handleChange} 
                id='email' 
                type='email' 
                placeholder='Enter your email' 
                onBlur={handleBlur} 
                className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.email && touched.email ? 'border-2 border-red-700 ' : ''}`}
            />
            {errors.email && touched.email && <p className='error'>{errors.email}</p>}
            <label htmlFor='username' className="block text-lg font-semibold mb-2 text-left">Username</label>
            <input 
                value={values.username} 
                onChange={handleChange} 
                id='username' 
                type='username' 
                placeholder='Enter your username' 
                onBlur={handleBlur} 
                className={`p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full ${errors.username && touched.username ? 'border-2 border-red-700 ' : ''}`}
            />
            {errors.username && touched.username && <p className='error'>{errors.username}</p>}
            <label htmlFor='password' className="text-left block text-lg font-semibold mb-2">Password</label>
            <input 
                value={values.password} 
                onChange={handleChange} 
                id='password' 
                type='password' 
                placeholder='Enter your password' 
                onBlur={handleBlur} 
                className={`p-4 mb-4 w-full bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.password && touched.password ? 'border-2 border-red-700 ' : ''}`}            />
            
            {errors.password && touched.password && <p className='error'>{errors.password}</p>}
            <label htmlFor='confirmPassword' className="text-left block text-lg font-semibold mb-2">Confirm Password</label>
            <input 
                value={values.confirmPassword} 
                onChange={handleChange} 
                id='confirmPassword' 
                type='password' 
                placeholder='Confirm your password' 
                onBlur={handleBlur} 
                className={`p-4 mb-6 w-full bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.confirmPassword && touched.confirmPassword ? 'border-2 border-red-700 ' : ''}`}
            />
            {errors.confirmPassword && touched.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
            
            <div className="mb-4 flex items-center">
            <input
                type="checkbox"
                id="premium"
                name="premium"
                className="h-5 w-5 text-blue-500 border-gray-300 rounded mr-2" onClick={()=>navigate('/payment')}
            />
            <label htmlFor='premium' className="text-lg font-semibold">Premium</label>
            </div>
            <p>Already have an account? <button onClick={()=>navigate('/login')}><strong>Login</strong></button> </p>
            <button 
                type='submit' disabled={isSubmitting } onSubmit={()=>navigate('/')}
                className={`${ isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer' } w-full bg-gray-800 text-yellow-500 py-4 px-8 text-lg font-bold rounded-lg hover:bg-gray-700`}
            >
                Submit
            </button>
        </form>
        
        {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
            {isSuccess && <div className='alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{successMessage}</div>}
       </div>
    )
}

export default Register
