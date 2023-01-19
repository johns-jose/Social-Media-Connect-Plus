import React from 'react'
import './HeaderOption.css'
import { Avatar } from '@mui/material';
import { useSelector } from "react-redux"

function HeaderOption({ avatar, Icon, title }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER


  const user = useSelector((state) => {
    return state.userData.data
  })


  return (
    <div className='headerOption'>
      {Icon && <Icon />}
      {avatar && <Avatar src={PF+user.profilePic} className='headerOption__icon'></Avatar>}
      <h3>{title}</h3>
    </div>
  )
}

export default HeaderOption