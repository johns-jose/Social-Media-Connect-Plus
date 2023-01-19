import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OTPInput from 'otp-input-react'
import axios from '../../../Axios/axios'
import Countdown from "react-countdown"



function UserSignup() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [otpModal, setOtpModal] = useState(false);

  const [otp, setOtp] = useState(false);
  const [otpError, setOtpError] = useState("")
  const [resend, setResend] = useState(false)

  const signupData = { name, phone, email, password }

  const errors = {};
  const validate = (name, email, phone, password) => {
    const regexname = /^[A-Za-z][A-Za-z0-9_ ]{4,14}$/i;
    const regexMail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!name) {
      errors.name = 'name is required';
    } else if (!regexname.test(name)) {
      errors.name = "name is not valid"
    }
    if (!email) {
      errors.email = "email is required"

    } else if (!regexMail.test(email)) {
      errors.email = "Not a valid email format"
    }
    if (!phone) {
      errors.phone = "phone number is required"
    } else if (phone.length !== 10) {
      errors.phone = "Phone number must be 10 digit"
    }
    if (!password) {
      errors.password = "password is required"
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters"
    } else if (password.length > 10) {
      errors.password = "Password should not exceed 10 characters"
    }
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', email, password, phone, name);
    setFormErrors(validate(name, email, phone, password));
    setIsSubmit(true);
  }

  // useEffect(() => {
  //   console.log(formErrors, 'useEffect');
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log('iffffffffffffffffff');
  //     const signupData = { name, phone, email, password }
  //     console.log(signupData, 'iffffffffffffffffff');
  //     axios.post("http://localhost:4000/register", signupData).then((res) => {
  //       console.log(res, 'hiiiiiiiiiiiiiiiiiiiiiii');
  //       if (res.data == "invalid") {
  //         errors.email = "Email already exists"
  //         setFormErrors(errors)
  //       } else {
  //         console.log('hhhhh');
  //         navigate('/login')
  //       }

  //     })

  //   } else {
  //     console.log('elseeeeee');
  //   }
  // }, [formErrors]);

  useEffect(() => {
    console.log(formErrors, 'useEffect');
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log('iffffffffffffffffff');
      const signupData = { name, phone, email, password }
      console.log(signupData, 'iffffffffffffffffff');
      axios.post("sendOtp", signupData).then((res) => {
        console.log(res, 'hiiiiiiiiiiiiiiiiiiiiiii');
        if (res.data == "invalid") {
          errors.email = "Email already exists"
          setFormErrors(errors)
        } else {
          console.log('hhhhh');
          setOtpModal(true)
          setTimeout(() => {
            setResend(true)
          }, "10000")
        }

      })

    } else {
      console.log('elseeeeee');
    }
  }, [formErrors]);

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (otp.length < 6) {
      setOtpError("Provide a 6 digit OTP")
    } else {
      const details = {
        otp: otp,
        email: signupData.email,
      }
      setOtp("")
      try {
        const { data } = await axios.post('validateOtp', details)
        console.log(data, 'return of otp verification');
        if (data.auth) {
          setOtpModal(false)
          try {
              await  axios.post('register', signupData).then((res) => {
              navigate('/login')
            })

          } catch (err) {

          }

        }
      } catch (err) {

      }
    }

  }
  /* ------------------------------- RESEND OTP ------------------------------- */

  const resendOtp = async (e) => {
    e.preventDefault()
    console.log('resendOtp start');
    setOtp("")

    try {
      axios.post('resendOtpCall', signupData).then((res) => {
        console.log(res, 'ressssssss');
        alert('resend otp reached front')
        if (res.data.status) {
         
          setResend(false)
          setTimeout(() => {
            setResend(true)
          }, "10000")
        }
      })

    } catch (err) {
      console.log(err);
    }
  }

  return (

    <>
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

        <div class="mt-10">

          <div class="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
            <div class="mx-auto mb-2 space-y-3">
              <h1 class=" text-3xl font-bold text-blue-900">Welcome</h1>
              <p class="text-gray-500">Create your Account</p>
            </div>

            <div>
              <div class="relative mt-2 w-full">
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" name='name' class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label for="name" class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your FullName </label>
              </div>
              {formErrors.name ? <div className='text-red-700 text-center'>{formErrors.name}</div> : <></>}
            </div>

            <div>
              <div class="relative mt-2 w-full">
                <input onChange={(e) => setPhone(e.target.value)} value={phone} type="number" id="number" name='phone' class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label for="number" class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Number </label>
              </div>
              {formErrors.phone ? <div className='text-red-700 text-center'>{formErrors.phone}</div> : <></>}
            </div>

            <div>
              <div class="relative mt-2 w-full">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" name='email' class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label for="email" class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Email </label>
              </div>
              {formErrors.email ? <div className='text-red-700 text-center'>{formErrors.email}</div> : <></>}
            </div>

            <div>
              <div class="relative mt-2 w-full">
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" id="password" name='password' class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label for="password" class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Password</label>
              </div>
              {formErrors.password ? <div className='text-red-700 text-center'>{formErrors.password}</div> : <></>}
            </div>

            <button onClick={handleSubmit} class="rounded-lg bg-blue-900 py-3 font-bold text-white">Create</button>
            <div>You Have an account ? <a onClick={(e) => { navigate("/login") }} className='text-red-700 cursor-pointer hover:text-blue-700'> Login</a></div>
          </div>
        </div>



      </div>
      {otpModal ? (
        <div className=" flex min-h-screen flex-col justify-center overflow-hidden">
          <div className="relative bg-gradient-to-r from-gray-900 bg-gray-600 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <button type="button" className="float-right bg-whit rounded-md p-2 inline-flex items-center justify-center text-black hover:text-black hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
              <span className="sr-only" onClick={() => setOtpModal(otpModal)} >Close menu</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl text-white">
                  <p>Email Verification</p>
                </div>
              </div>
              <div>
                <p className='text-red-500 font-[8px] mb-3 pl-3 text-center'></p>
                <form >
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row  items-center justify-between mx-auto w-full max-w-xs">
                      <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} />
                    </div>
                    <div className="flex flex-col space-y-5">
                      <div>
                        <button onClick={handleSignUp} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                          Verify Account
                        </button>
                      </div>
                      {resend ? <button onClick={resendOtp} >
                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-white" >
                          <p>Didn't recieve code?</p> <span className="flex flex-row items-center text-blue-600">Resend</span>
                        </div>
                      </button> : <Countdown date={Date.now() + 10000} />}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </>
  )
}

export default UserSignup