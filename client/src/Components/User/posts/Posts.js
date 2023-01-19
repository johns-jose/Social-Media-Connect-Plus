import "./posts.css";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { format } from "timeago.js"
import axios from "../../../Axios/axios";
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux";
import { setComments } from '../../../redux-toolkit/commentReducer'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';  //Toast
import 'react-toastify/dist/ReactToastify.css';  //Toast Css

export default function Posts({ obj, setBlock }) {
  const [like, setLike] = useState(obj.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [postDrop, setPostdrop] = useState(false)
  const [commentShow, setCommentShow] = useState(false)
  const [commentDesc, setCommentDesc] = useState('')
  const [comments, setComments] = useState([])

  const [showModalPostupdation, setShowModalPostupdation] = useState(false);
  const [updateDesc, setUpdateDesc] = useState('')
  const dispatch = useDispatch()


  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const userId = localStorage.getItem('userInfo.id')
  const userToken = localStorage.getItem('userToken')

  // const allcomments = useSelector((state)=>{
  //   return state.comments.comments
  // })
  console.log('comments', comments);


  const user = useSelector((state) => {
    return state.userData.data

  })
  useEffect(() => {
    setIsLiked(obj.likes.includes(userId));

  }, []);

  const likeHandler = async () => {
    const ids = { userId }
    await axios.put('like/' + obj._id, ids, { headers: { token: `Bearer ${userToken}` } }).then((res) => {
      setLike(isLiked ? like - 1 : like + 1)
      setIsLiked(!isLiked)
      console.log(res);
    }).catch((err) => {
      console.log(err);


    })
    //  window.location.reload()
  }


  const deletePost = (postId) => {
    axios.post('deletePost/' + postId).then((res) => {
      console.log(res);
      toast.warn(res.data.message)
      setBlock(Date.now())
    }).catch((err) => {
      console.log(err);
    })



  }

  const submitEditHandler = async (e) => {
    e.preventDefault()
    const updationData = { updateDesc, postId: obj._id }

    await axios.post('editPost', updationData, { headers: { token: `Bearer ${userToken}` } }).then((res) => {
      console.log(res);
      setShowModalPostupdation(false)
      setPostdrop(false)
      toast.warn(res.data.message)
      setBlock(Date.now())


    }).catch((err) => {
      console.log(err);
    })
  }

  const submitCommentHandler = async (e) => {
    e.preventDefault()
    const commentData = { userId, postId: obj._id, commentDesc }
    try {
      await axios.post('comment', commentData, { headers: { token: `Bearer ${userToken}` } }).then((response) => {
        setCommentDesc('')
        console.log(response)
      })
    } catch (err) {
      console.log(err)

    }
  }

  useEffect(() => {
    try {
      axios.get(`getComments/${obj._id}`, { headers: { token: `Bearer ${userToken}` } }).then((res) => {
        // dispatch(setComments(res.data))
        setComments(res.data)
        console.log(res.data, 'commentdata');

      })
    } catch (error) {
      console.log(error);
    }

  }, [commentDesc])

  const reportPost = (postId) => {
    let data = { postId, currentuserId: user._id }
    try {
      axios.post('reportpost', (data), { headers: { token: `Bearer ${userToken}` } }).then((response) => {
        console.log(response.data.message);
        setPostdrop(false)
        setBlock(Date.now())
        toast.warn(response.data.message)

      })

    } catch (error) {

    }


  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${obj.userId.userName}`}> <span><Avatar src={PF + obj.userId.profilePic} /></span></Link>
            {/* <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            /> */}
            {/* <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span> */}
            <span className="postUsername">{obj.userId.userName}</span>
            <span className="postDate">{format(obj.createdAt)}</span>
            {/* <span className="postDate">{post.date}</span> */}
          </div>
          <div className="postTopRight">
            {/* <MoreVertIcon /> */}

            {/* profile drop start */}
            <div className="flex justify-center">
              <div className="relative inline-block mb-20">

                <button onClick={(e) => { setPostdrop(!postDrop) }} className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none">
                  {/* <span className="mx-1">. . . </span> */}
                  <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                  </svg>
                </button>
                {postDrop && <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
                  <hr className="border-gray-200 dark:border-gray-700 " />
                  {
                    (obj.userId._id == userId) ?
                      <a onClick={(e) => { setShowModalPostupdation(!showModalPostupdation) }} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        Edit
                      </a> : null
                  }
                  {
                    (obj.userId._id == userId) ?
                      <a onClick={() => { deletePost(obj._id) }} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        Delete
                      </a> : null
                  }
                  {
                    (obj.userId._id != userId) ?
                      <a onClick={() => { reportPost(obj._id) }} class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        Report
                      </a> : null
                  }


                </div>}
              </div>
            </div>
            {/* profile drop end */}

          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{obj.desc}</span>
          {/* <span className="postText">{post?.desc}</span> */}
          {obj.image && <img className="postImg" src={PF + obj.image} alt="" />}
          {obj.video && <video className="postImg" type='video/mp4' controls src={PF + obj.video} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <span className="likeIcon" ><ThumbUpIcon onClick={likeHandler} /></span>
            {/* <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" /> */}
            {/* <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            {/* onClick={()=>{showComments(obj._id)}} */}
            <span className="postCommentText" onClick={(e) => { setCommentShow(!commentShow) }} > comments</span>
            {/* <span className="postCommentText">{post.comment} comments</span> */}

          </div>
        </div>
        {/* comment box start */}
        {commentShow ?
          <div>
            {comments.map((item) => {
              return (
                <div className="bg-slate-50 flex gap-3 my-2 items-center">

                  <div>
                    {/* <img className="w-8 rounded-full" src={PF+obj.userId.profilePicture} alt="profile" /> */}
                    <img className="w-8 rounded-full" src="" alt="" />
                  </div>
                  <div>
                    <div>
                      <span className="font-medium text-sm mr-2">{item.userId.userName}</span>
                      <span className="">{item.commentDesc}</span>
                    </div>
                    <p className="text-slate-500 text-xs ">{format(item.createdAt)}</p>
                  </div>
                </div>
              )
            })
            }

            <form action="" onSubmit={submitCommentHandler} class="w-full p-4 bg-slate-100">
              <label class="block mb-2">
                <textarea value={commentDesc} onChange={(e) => { setCommentDesc(e.target.value) }} class="block w-full mt-1 rounded" rows="3" placeholder='Post a Comment'></textarea>
              </label>
              <button type='submit' class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded" >Comment</button>
            </form>

          </div>
          : null}
        {/* comment box end */}
      </div>
      {showModalPostupdation ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {/* <h3 className="text-3xl font-semibold">{modalData.name}</h3> */}
                  <h3 className="text-3xl font-semibold">Update post </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={(e) => setShowModalPostupdation(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div class="">
                    <div class="mx-auto max-w-screen-sm px-4">
                      {/* <p class="mt-6 text-xl font-bold sm:mb-6 sm:text-3xl">Write your comment</p> */}
                      <form action="" onSubmit={submitEditHandler}>
                        <div class="-ml-20 flex p-4 text-left text-gray-700">
                          <img class="mr-5 h-12 w-12 rounded-full" src="https://ui-avatars.com/api/?name=John+Doe" alt="" />
                          <div class="w-full space-y-3 text-gray-700">

                            {/* <label htmlFor="imageFile">Upload New Profile Picture</label> */}
                            {/* <input onChange={(e) => { setImageFile(e.target.files[0]) }} name='imageFile' type="file" placeholder="name" class="h-12 w-full max-w-full rounded-md  bg-white px-5 text-sm outline-none" /> */}


                            <div class="">
                              <textarea onChange={(e) => { setUpdateDesc(e.target.value) }} name="comment" id="" placeholder="Enter updated text for Post" cols="30" rows="6" class="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"></textarea>
                            </div>
                            <div class="float-right">
                              <button type="submit" class="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-blue-700 px-4 text-center text-sm font-medium normal-case text-white opacity-100 outline-none focus:ring" >Submit</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* body */}
                </div>

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark" />
    </div>

  );
}