import { getToken } from "../utils/storageHandler"
import { BASE_URL } from "../utils/urls"
import axios from'axios'
axios.defaults.withCredentials = true

export const registerUserAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/user/register`,data)
    return response.data
}

export const loginUserAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/user/login`,data)
    // setToken(response.data.accessToken)
    // localStorage.setItem('userToken', data.userToken)
    return response.data
}

export const leaderBoardAPI = async ()=>{
    const userToken = getToken()
    
    const response = await axios.get(`${BASE_URL}/user/leaderboard`,{
        headers:{
            Authorization:`Bearer ${userToken}`
        }
    })
    
    return response.data
}