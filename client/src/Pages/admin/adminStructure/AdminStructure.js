import React, { useEffect } from 'react'
import { Outlet ,useNavigate} from 'react-router-dom'
import AdminSideBar from '../../../Components/Admin/adminSidebar/AdminSidebar'

function AdminStructure() {

  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("adminToken")
    if(!token){
        navigate('/adminlogin')
    }else{
      navigate('/admin/usermanagement')
    }
  },[])

  return (

    <div>

      <section className="flex gap-6">
        <AdminSideBar />
        <Outlet />
      </section>
    </div>


  )
}

export default AdminStructure