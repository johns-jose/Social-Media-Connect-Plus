import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Logo from "../../asset/Logo.png"
// import axios from 'axios'
import axios from "../../../Axios/axios"


function UserLogin() {
  const navigate = useNavigate()
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [formErrors,setFormErrors]=useState({});
  const [accounterror,setAccounterror]=useState(null);
  const [isSubmit,setIsSubmit]= useState(false);
  const errors = {};
  
  const validate=(email,password)=>{
    

      const regexMail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if(!email){
        errors.email="email is required"
      }else if(!regexMail.test(email)){
        errors.email="Not a valid email format"
      }
      if(!password){
        errors.password="password is required"
      }
      // }else if(password.length<4){
      //   errors.password="Password must be more than 4 characters"
      // }else if(password.length>10){
      //   errors.password="Password should not exceed 10 characters"
      // }
      return errors
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',email,password);
      setFormErrors(validate(email,password));
      setIsSubmit(true);
    }

    useEffect(()=>{
      console.log(formErrors,'useEffect');
      if(Object.keys(formErrors).length===0 && isSubmit){
        const loginData ={email,password}
        axios.post("login",loginData).then((res)=>{
          console.log(res.data,'uuuuuuuu');
          if(res.data == 'Invalidemail'){
            errors.email = "Invalid Email"
            setFormErrors(errors)
          }else if(res.data  == 'Invalidpass'){
            errors.password = 'incorrect password'
            setFormErrors(errors)
          }else {
    
            // console.log('data',userDetails)
            
            console.log('data',res.data.user._id)
            console.log('token',res.data.token)

            localStorage.setItem("userToken",res.data.token)
            localStorage.setItem("userInfo.id",res.data.user._id)
            navigate('/feed') 
          }
           

        }).catch((err)=>{
          console.log('blockerror',err.response.data);
          let msg =err.response.data.mesage
          console.log(msg,'errrr')
          setAccounterror(msg)
          console.log(accounterror,'forrrrrrrr')
        })
      }
    },[formErrors]);

    

  return (
    <div>
      {/* <header class="text-white container bg-green-800 relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
        <a href="/" class="flex items-center whitespace-nowrap text-2xl font-black">
          <span class="mr-2 w-8">
            <img src={Logo} alt="" />
          </span>
        </a>
        <input type="checkbox" class="peer hidden" id="navbar-open" />
        <label class="absolute top-5 right-5 cursor-pointer lg:hidden" for="navbar-open">
          <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        <nav aria-label="Header Navigation" class="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row">
          <ul class="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
            <li class="lg:mr-12"><a class="rounded text-white transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#">Components</a></li>
            <li class="lg:mr-12"><a class="rounded text-white transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#">Pricing</a></li>
            <li class="lg:mr-12"><a class="rounded text-white transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#">Contact</a></li>
            <li class="lg:mr-12"><a class="rounded text-white transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#">FAQ</a></li>
          </ul>
        </nav>
      </header> */}

      <div class="mt-24">
        <div class="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
          <div class="mx-auto mb-2 space-y-3">
            <h1 class=" text-3xl font-bold text-blue-900">Welcome</h1>
            <p class="text-gray-500">Login to access your account</p>
            {accounterror!==null && <div className='text-red-600'><i className="fa-regular fa-circle-exclamation"></i>{accounterror}</div>}
          </div>
          
          <div>
            <div class="relative mt-2 w-full">
              <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" id="email" name='name' class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
              <label for="email" class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Email </label>
            </div>
            <div className='text-red-600'>{formErrors.email}</div>
          </div>
          <div>
            <div class="relative mt-2 w-full">
              <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" id="password" name='password' class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
              <label for="password" class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Password</label>
            </div>
            {formErrors.password ? <div className='text-red-600'><i className="fa-regular fa-circle-exclamation"></i>{formErrors.password}</div> : <></>}
          </div>

          <button onClick={handleSubmit} class="rounded-lg bg-blue-900 py-3 font-bold text-white">Login</button>

          <div>Create an account ? <a onClick={(e)=>{navigate("/signup")}} className='text-red-700 cursor-pointer hover:text-blue-700'> Signup</a></div>
        </div>
        
      </div>
    </div>
  )
}

export default UserLogin