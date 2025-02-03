import React from 'react'
import Home from '../pages/Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Tasks from '../pages/Tasks'
import Diary from '../pages/Diary'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useSelector } from 'react-redux'
import NavbarLogin from '../components/NavbarLogin'
import NavbarLogout from '../components/NavbarLogout'
import Todos from '../pages/Todos'
import ErrorPage from '../pages/ErrorPage'
import EditDailyTask from '../components/EditDailyTask'
import Payment from '../components/Payment'

const Index = () => {
  const user = useSelector((state)=>state.auth.user)
  
  return (
    <div>
      
      
      {user ?
        <BrowserRouter>
       <NavbarLogout /> 
            <Routes>
                <Route path='/tasks' element={<Tasks/>}/>
                <Route path='/editTask' element={<EditDailyTask/>}/>
                <Route path='/diary' element={<Diary/>}/>                
                <Route path='/todo' element={<Todos/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter> :
        <BrowserRouter>
        <NavbarLogin/>
        <Routes>
              {/* <Route path='/login' element={<Login/>}/> */}
              <Route path='/register' element={<Register/>}/>
              <Route path="/payment" element={<Payment/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/*" element={<Login/>}/>
              </Routes>
        </BrowserRouter>
          }

    </div>
  )
}

export default Index
