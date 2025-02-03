import axios from 'axios'
import { getToken } from '../utils/storageHandler'
import { BASE_URL } from '../utils/urls'
axios.defaults.withCredentials = true

export const addMemoryAPI=async(data)=>{
    const userToken=getToken()     
    const response = await axios.post(`${BASE_URL}/memory/add`,data
        ,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    }
)
    return response.data
}

export const getMemoriesAPI = async ()=>{   
    const userToken=getToken() 
    const response = await axios.get(`${BASE_URL}/memory/viewall`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const editMemoryAPI=async(data)=>{
    const userToken=getToken()
    const response=await axios.put(`${BASE_URL}/memory/edit`,data,
        {
            headers:{ 
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}

export const deleteMemoryAPI=async(data)=>{
    const userToken=getToken()

    const response=await axios.delete(`${BASE_URL}/memory/delete`,{data,
        
            headers:{
                Authorization:`Bearer ${userToken}`
            }
        }
    )
    return response.data
}