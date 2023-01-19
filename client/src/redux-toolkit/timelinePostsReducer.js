import { createSlice} from '@reduxjs/toolkit'

const timelinePostsSlice = createSlice({
    name:'timelinePosts',
    initialState:{
        timelinePosts:[],
     
    },
    reducers:{ 
      setTimelinePosts:(state,action)=>{state.timelinePosts=action.payload}
       
    }
})

export const{setTimelinePosts}=timelinePostsSlice.actions
export default timelinePostsSlice.reducer