import{configureStore} from '@reduxjs/toolkit'
import userInfo from './userInfoReducer'
import timelinePosts from './timelinePostsReducer'
import comments from "./commentReducer"

const store = configureStore({
reducer:{
    userData:userInfo,
    timelinePosts,
    comments
}
})

export default store  