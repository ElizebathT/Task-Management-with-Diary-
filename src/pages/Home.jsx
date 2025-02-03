import React from 'react'
import Navbar from '../components/Navbar'
import Intro from '../components/Intro'
import Leaderboard from '../components/Leaderboard'
import { useSelector } from 'react-redux'
import NavbarLogout from '../components/NavbarLogout'
import NavbarLogin from '../components/NavbarLogin'

const Home = () => {
  const user = useSelector((state)=>state.auth.user)
  return (
    <div>
      {/* {user?<NavbarLogout/> : <NavbarLogin/>} */}
      <Intro/>
      {user && <Leaderboard/>}
    </div>
  )
}

export default Home
