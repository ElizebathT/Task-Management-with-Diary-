import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
//  export const getUserdata = ()=>{
//     const token = localStorage.getItem('userToken');
//   return token ? jwtDecode(token) : null;
// }

export const getToken =()=>{
    return localStorage.getItem("userToken")
}

export const getUserdata= ()=>localStorage.getItem('userToken')
export const userData = getUserdata() ? getUserdata() : null