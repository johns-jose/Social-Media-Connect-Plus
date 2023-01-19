import React, { useEffect } from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import Swal from "sweetalert2"
import HeaderOption from './HeaderOption'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from 'react-redux'
import { getUserData,setData } from '../../../redux-toolkit/userInfoReducer'



function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  const user = useSelector((state) => {
    return state.userData.data
  })

  console.log(user, '==userinfo');





  const logout = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    }).then((result) => {
      if (result.isConfirmed) {


        localStorage.removeItem('userToken')
        localStorage.removeItem('userInfo.id')
        dispatch(setData(''))

        navigate("/")
        window.location.reload()


      }
    })

  }

  return (
    <div className='sticky top-0 z-50  '>
      <header className="  max-w-none bg-sky-500  text-slate-50 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
        <a href="#" className="flex items-center whitespace-nowrap text-2xl font-black">
          {/* <span className="mr-2 w-8">
            <img src="https://cdn2.vectorstock.com/i/1000x1000/90/71/connect-people-logo-vector-23529071.jpg" alt="" />
          </span> */}
          Connect Plus
        </a>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label className="absolute top-5 right-5 cursor-pointer lg:hidden" htmlFor="navbar-open">
          <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        <nav aria-label="Header Navigation" className="peer-checked:pt-8 peer-checked:max-h-screen flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row">


         {user._id? <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
            <li className="lg:mr-12"><NavLink to='/feed' className="rounded text-gray-50 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" ><HeaderOption Icon={HomeIcon} title='Home' /></NavLink></li>
            <li className="lg:mr-12"><a className="rounded text-gray-50 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#"><HeaderOption Icon={SupervisorAccountIcon} title='my Network' /></a></li>
            <li className="lg:mr-12">  <Link to={'/messenger'} className="rounded text-gray-50 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#"> <HeaderOption Icon={ChatIcon} title='Messaging' /></Link></li>
            <li className="lg:mr-12"><a className="rounded text-gray-50 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#"><HeaderOption Icon={NotificationsIcon} title='Notification' /></a></li>
            <li className="lg:mr-12"><Link to={`/profile/${user.userName}`} className="rounded text-gray-50 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#"><HeaderOption avatar={true} title={user.userName} /></Link></li>
          </ul>:<></>}
          <hr className="mt-4 w-full lg:hidden" />
          <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0"> 
            {/* <a onClick={() => { navigate('/login') }} title="" className="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50"> Log in </a> */}
            {!user._id ? <a onClick={() => { navigate('/login') }} href="#" title="" className="whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600">Login/Sign Up</a> :
              <a onClick={logout} href="#" title="" className="whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600">Log out</a>}


          </div>
        </nav>
      </header>

    </div>
  )
}

export default Header