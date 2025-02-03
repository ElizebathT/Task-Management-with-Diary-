import { useState } from "react"

export const BASE_URL = "http://localhost:3004"

// export const withAuth=(...data)=>async(config)=>{
//     const token=config.headers.Authorization?split(' ')[1]
//     const verified=token?await verifyToken(token):false
//     if(!verified){
//         return[403,{message:'Unauthorised'}]
//     }
//     return typeof data[0]==='function'?data[0](config):data;
// }

// export const verifyToken=async(token,options=undefined)=>{
//     try{
//         const verification=await jwt.decode(token,env.process.JWT_SECRET_KEY)
//     }
// }