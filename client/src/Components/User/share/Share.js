import "./share.css";
// import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Avatar } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from '../../../Axios/axios'
import CancelIcon from '@mui/icons-material/Cancel';


export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const desc = useRef()

  const user = useSelector((state) => {
    return state.userData.data
  })
  const [img, setImg] = useState(null)
  const [video, setVideo] = useState(null)
  const userToken = localStorage.getItem('userToken')

  console.log(img, "imgsssssss");
  const handlerSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }
    if (img) {
      const data = new FormData();
      const fileName = img.name
      data.append("file", img)
      data.append("name", fileName)
      newPost.image = fileName
      try {
        await axios.post('upload', data,{headers:{ token: `Bearer ${userToken}` }})
      } catch (err) {
        console.log(err);

      }
    }
    if (video) {
      const data = new FormData();
      const fileName = video.name
      data.append("file", video)
      data.append("name", fileName)
      newPost.video = fileName
      try {
        await axios.post('upload', data,{headers:{ token: `Bearer ${userToken}` }})
      } catch (err) {
        console.log(err);

      }
    }
    try {
      await axios.post('posts', newPost,{headers:{ token: `Bearer ${userToken}` }})
      window.location.reload()
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          {/* <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" /> */}
          <span><Avatar src={PF+user.profilePic} /></span>
          <input
            placeholder="What's in your mind ?"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {img && (<div className="shareImagecontainer">
          <img className="shareImage" src={URL.createObjectURL(img)} alt="" />
          <CancelIcon className="shareCancelImg" onClick={() => { setImg(null) }} />
        </div>
        )}
        {video && (<div className="shareImagcontainer">
          <video className="shareImage" type='video/mp4' src={URL.createObjectURL(video)} alt="" />
          <CancelIcon className="shareCancelImg" onClick={() => { setVideo(null) }} />
        </div>
        )}
        <form className="shareBottom" onSubmit={handlerSubmit}>
          <div className="shareOptions">

            <label htmlFor="file" className="shareOption">
              < PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <input style={{ display: 'none' }} type="file" id="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
              <span className="shareOptionText">Photo</span>
            </label>
            <label htmlFor="videoFile" className="shareOption">
              <VideoLibraryIcon htmlColor="blue" className="shareIcon" />
              <input type="file" style={{ display: 'none' }} id="videoFile" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
              <span className="shareOptionText">Video</span>
            </label >
            {/* <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div> */}
          </div>
          <div>
            <button className="shareButton" type="submit">Share</button>
          </div>
        </form>
      </div>
    </div>
  );
}