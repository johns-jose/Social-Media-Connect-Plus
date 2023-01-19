import "./profile.css";
import { Avatar } from "@mui/material";
import Header from "../../Components/User/Header/Header";
import Sidebars from "../../Components/User/sidebar/Sidebars";
import Feeds from "../../Components/User/feeds/Feeds";
import Rightbar from "../../Components/User/rightbar/Rightbar";
import { useSelector } from "react-redux";
import axios from '../../Axios/axios'
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router'


export default function Profile() {
  const city = useRef()
  const from = useRef()

  const [currentUser, setCurrentUser] = useState({})
  const [editProfile, setEditProfile] = useState(false)
  const [profilePic, setProfilePic] = useState(null)
  const [coverPic, setCoverPic] = useState(null)
  const userToken = localStorage.getItem('userToken')
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
 

  const username = useParams().username

  // const params = useParams()
  // console.log(' params', params);

  const user = useSelector((state) => {
    return state.userData.data
  })
console.log('coverPic',coverPic);
console.log('profilePic',profilePic);
  useEffect(() => {
    const getUserData = async () => {
      await axios.get(`profileUser/${username}`,{headers:{ token: `Bearer ${userToken}` }}).then((res) => {

        setCurrentUser(res.data)
      }).catch((err) => {
        console.log(err);

      })
    }
    getUserData()
  }, [])

  console.log('currentUser', currentUser);



  const handlerEditProfileSubmit = async(e) => {
    e.preventDefault()
    const profileInfo = {
      city: city.current.value,
      from: from.current.value
    }
    if (profilePic) {
      const data = new FormData();
      const fileName = profilePic.name
      data.append("file", profilePic)
      data.append("name", fileName)
      profileInfo.profilePic = fileName
      try {
         await axios.post('upload',data)
      } catch (err) {
        console.log(err);
        
      }
    }
    if (coverPic) {
      const data = new FormData();
      const fileName = coverPic.name
      data.append("file", coverPic)
      data.append("name", fileName)
      profileInfo.coverPic = fileName
      try {
         await axios.post('upload',data,{headers:{ token: `Bearer ${userToken}` }})
      } catch (err) {
        console.log(err);
        
      }
    }
    try {
      await axios.put(`profileEdit/${currentUser._id}`, profileInfo,{headers:{ token: `Bearer ${userToken}` }}).then((response)=>{
       
        setEditProfile(!editProfile)
        window.location.reload()
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />

    
      <div className="profile">
        <Sidebars />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF+currentUser.coverPic}
                alt=""
              />
              <img

                className="profileUserImg"
                src={PF+currentUser.profilePic}
                alt=""
              />
              {/* <span><Avatar className="profileUserImg"/></span> */}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.userName}</h4>
              {/* <span className="profileInfoDesc">Hello my friends!</span> */}


            </div>
            <div className="editbutton">
           { username==user.userName && <button className="button" onClick={(e) => { setEditProfile(!editProfile) }} >Edit Profile</button>}

            </div>
          </div>
          <div className="profileRightBottom">
            <Feeds username={currentUser.userName} />
            <Rightbar user={currentUser} />
          </div>
        </div>




      </div>




      {/* <!-- Main modal --> */}
      {editProfile ? (<div class="fixed top-50 left-50 right-0 z-50   w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div class="relative w-full h-full max-w-md md:h-auto">
          {/* <!-- Modal content --> */}
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" onClick={(e) => { setEditProfile(false) }} >
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Profile</h3>
              <form class="space-y-6" action="#" onSubmit={handlerEditProfileSubmit} >
                <div>
                  <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                  <input type="text"    ref={city} name="city" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"   />
                </div>
                <div>
                  <label for="From" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
                  <input type="text"    ref={from} name="from" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                </div>
                <div>
                  <label for="profilePic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">profilePictur</label>
                  <input type="file" accept="image/*" onChange={(e)=>{setProfilePic(e.target.files[0])}} name="profilePic" id="profilePic" placeholder="profilePic" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                </div>
                <div>
                  <label for="coverPic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">covePicture</label>
                  <input type="file" accept="image/*" onChange={(e)=>{setCoverPic(e.target.files[0])}} name="coverPic" id="coverPic" placeholder="coverPic " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                </div>
                {/* <div class="flex justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div> */}
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  >Submit</button>
                {/* <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>) : null}


    </>

  );
}