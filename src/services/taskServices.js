import { getToken } from "../utils/storageHandler";
import { BASE_URL } from "../utils/urls";
import axios from 'axios'
axios.defaults.withCredentials = true



export const getAllTaskAPI = async ()=>{   
    const userToken=getToken() 
    const response = await axios.get(`${BASE_URL}/dailytask/viewall`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const addDailyTaskAPI=async(data)=>{
    const userToken=getToken() 
    
    const response = await axios.post(`${BASE_URL}/dailytask/add`,data
        ,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    }
)

    return response.data
}

export const completeTaskAPI=async(data)=>{
    const userToken=getToken()
    
    const response=await axios.put(`${BASE_URL}/dailytask/taskcompleted`,data,
        {
            headers:{
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}

export const deleteTaskAPI=async(data)=>{
    const userToken=getToken()

    const response=await axios.delete(`${BASE_URL}/dailytask/delete`,{data,
        
            headers:{
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}

export const editTaskAPI=async(data)=>{
    const userToken=getToken()
    const response=await axios.put(`${BASE_URL}/dailytask/edit`,data,
        {
            headers:{ 
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}

export const searchTaskAPI=async(data)=>{
    const userToken=getToken()
    const response=await axios.put(`${BASE_URL}/dailytask/display`,data,
        {
            headers:{ 
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}
