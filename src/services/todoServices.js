import axios from 'axios'
import { getToken } from '../utils/storageHandler'
import { BASE_URL } from '../utils/urls'
axios.defaults.withCredentials = true

export const addTodoAPI=async(data)=>{
    const userToken=getToken()     
    const response = await axios.post(`${BASE_URL}/todo/add`,data
        ,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    }
)

    return response.data
}

export const getTodosAPI = async ()=>{   
    const userToken=getToken() 
    const response = await axios.get(`${BASE_URL}/todo/viewall`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const deleteTodoAPI=async(data)=>{
    const userToken=getToken()

    const response=await axios.delete(`${BASE_URL}/todo/delete`,{data,
        
            headers:{
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}

export const editTodoAPI=async(data)=>{
    const userToken=getToken()
    const response=await axios.put(`${BASE_URL}/todo/edit`,data,
        {
            headers:{ 
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}

export const completeTodoAPI=async(data)=>{
    const userToken=getToken()
    
    const response=await axios.post(`${BASE_URL}/todo/completedTasks`,data,
        {
            headers:{
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}