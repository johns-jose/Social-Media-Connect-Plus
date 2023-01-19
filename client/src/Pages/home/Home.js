import React, { useEffect } from 'react'
import Feeds from '../../Components/User/feeds/Feeds'
import Header from '../../Components/User/Header/Header'
import Rightbar from '../../Components/User/rightbar/Rightbar'
import Sidebars from '../../Components/User/sidebar/Sidebars'
import{useSelector,useDispatch} from 'react-redux'
// import {getUserData} from '../../redux-toolkit/userInfoReducer'
import "./home.css"

function Home() {
  // const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(getUserData())
  // },[dispatch])
  return (
    <div>
      <Header/>
      <div className='homeContainer'>
        <Sidebars/>
        <Feeds/>
        <Rightbar/>
        
      </div>
    </div>
  )
}

export default Home
