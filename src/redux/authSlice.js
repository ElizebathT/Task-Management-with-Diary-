import {createSlice} from '@reduxjs/toolkit'
import { loginUserAPI, registerUserAPI } from '../services/userServices'
import { getUserdata, userData } from '../utils/storageHandler'



// const initialState = {
//     userInfo: getUserdata() || null, 
//     userToken: localStorage.getItem('userToken') || null, 
//   }
  
//   const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loginUserAction:((state,action)=>{
//           console.log("Login Payload: ", action.payload);
//           state.userToken = action.payload.userToken;
//           state.userInfo = action.payload.userInfo;
//         }),
//         registerUserAction:((state,action)=>{
//             state.userToken = action.payload.userToken;
//       state.userInfo = action.payload.userInfo; 
//         })
//     },
//     // extraReducers: {
//         // [loginUserAPI.pending]: (state) => {
//         //     state.loading = true
//         //     state.error = null
//         //   },
//         //   [loginUserAPI.fulfilled]: (state, { payload }) => {
//         //     state.loading = false
//         //     state.userInfo = payload
//         //     state.userToken = payload.userToken
//         //   },
//         //   loginUserAPI: (state, { payload }) => {
//         //     state.loading = false
//         //     state.error = payload
//         //   },
//     },
// )

export const AuthSlice= createSlice({
  name:"authSlice",
  initialState:{
      user:userData || null
  },
  reducers:{
      loginUserAction:((state,action)=>{
        console.log(action);
        
          state.user = action.payload
      }),
      registerUserAction:((state,action)=>{

          state.user = action.payload
        
      }),
      logoutAction: (state, action) => {
        state.user = null;
        // localStorage.removeItem('userToken');
      }
  }
})

export default AuthSlice.reducer

export const {loginUserAction,registerUserAction,logoutAction} =  AuthSlice.actions