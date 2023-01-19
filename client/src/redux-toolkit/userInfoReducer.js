import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../Axios/axios'
// import axios from 'axios'

 const getUserData = createAsyncThunk('api/userData',()=>{
    const userId = localStorage.getItem('userInfo.id')
    return axios.get(`getUserInfo/${userId}`).then((res)=>{
        return res.data

    })
})
 
const userInfoSlice = createSlice({
    name:'userData',
    initialState:{
        data:{},
        pending:false,
        rejected:false

    },
    reducers:{
        setData:(state,action)=>{state.userData=action.payload}
    
    },
    extraReducers:{ 
        [getUserData.pending]:(state, action)=>{
            state.pending=true
        },
        [getUserData.fulfilled]:(state, action)=>{
            state.data= action.payload
        },
        [getUserData.rejected]:(state, action)=>{
            state.rejected=true
        }
       
    }

})

export {getUserData}
export const{setData}=userInfoSlice.actions

export default userInfoSlice.reducer 