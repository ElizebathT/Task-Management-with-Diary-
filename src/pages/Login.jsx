import { Field, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import { advSchema } from '../schemas'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginUserAPI } from '../services/userServices'
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../redux/authSlice'
import { jwtDecode } from 'jwt-decode'
// import Alert from '@mui/material/Alert'

const Login = () => {
    const [successMessage, setSuccessMessage] = useState(null);
  const {mutateAsync,isError,error,isPending,isSuccess}=useMutation({
    mutationFn:loginUserAPI,
    mutationKey:["login-user"]
})
    const navigate = useNavigate()
      
    const dispatch = useDispatch()
    const {values, handleBlur, isSubmitting,touched, errors,handleChange,handleSubmit} = useFormik({
            initialValues: {
                email: '',
                password: ''
            },
            validationSchema:advSchema,
            onSubmit:(values,action)=>{
                mutateAsync(values).then((data)=>{
                    localStorage.setItem("userToken",data )
                    const decodedData = jwtDecode(data)
                    dispatch(loginUserAction(decodedData))  
                    setSuccessMessage(data);
                    action.resetForm()
                    navigate("/")                
                })                   
                
            }
        })
        
        
  return (
    <div className="bg-yellow-500 py-20 h-screen">
        
    <form 
       onSubmit={handleSubmit}  autoComplete='off' className="bg-yellow-500 text-gray-800 p-10 rounded-lg text-center max-w-lg mx-auto">
       <h3 className="text-2xl font-bold mb-5">Login Account</h3>
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
            
            {/* <CustomInput
                label="Email"
                name="email"
                type="email"
                onChange={handleChange} 
                id='email'
                value={values.email} 
                onBlur={handleBlur} 
                placeholder="Enter your email"
            />
             */}
           {/* <CustomInput
                label="Password"
                name="password"
                value={values.password} 
                onChange={handleChange} 
                id='password' 
                type="password"
                onBlur={handleBlur} 
                placeholder="Enter your password"
            /> */}
            {/* <Field type='text' name="email" placeholder="Email" className="p-4 mb-4 bg-gray-100 rounded-lg text-gray-800 w-full"/> */}
            <p>Already have an account? <button type="button" onClick={()=>navigate('/register')}><strong>Register</strong></button> </p>
            
          <button type="submit" 
          className='w-full bg-gray-800 text-yellow-500 py-4 px-8 text-lg font-bold rounded-lg hover:bg-gray-700'
          >
            Submit</button>
            
         </form>
         
         {isError && <div className='alert-box bg-red-100 text-red-800 border border-red-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{error?.response?.data?.message}</div>}
            {isSuccess && <div className='alert-box bg-green-100 text-green-800 border border-green-300 text-center max-w-lg p-5 rounded-lg mx-auto'>{successMessage}</div>}
       </div>
  )
}

export default Login
