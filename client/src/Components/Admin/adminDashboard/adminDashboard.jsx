
import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'


function AdminDashboard() {

    const navigate = useNavigate()

    useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if(!token){
        navigate('/adminlogin')
    }  
    })
    


  return (
    <div>
        Welcome to Dashboard

    </div>
  )
}

export default AdminDashboard