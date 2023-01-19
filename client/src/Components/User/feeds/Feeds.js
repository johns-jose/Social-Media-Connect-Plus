
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../posts/Posts";
import Share from "../share/Share";
import "./feeds.css";
import axios from '../../../Axios/axios'
// import { setTimelinePosts } from "../../../redux-toolkit/timelinePostsReducer";

 



export default function Feeds({ username }) {

  const [timelinePosts, setTimelinePosts] = useState([])
  const [block, setBlock] = useState('')


  // const dispatch = useDispatch()

  // const timeline = useSelector((state)=>{
  //   return state.timelinePosts.timelinePosts


  // })



  console.log(timelinePosts, '=========timelineeeeeeeeeeeposts');
  const user = useSelector((state) => {
    return state.userData.data

  })

  console.log(user._id, '==============user');


  useEffect(() => {
    const fetchPosts = async () => {
      const userId = localStorage.getItem('userInfo.id')
      const userToken = localStorage.getItem('userToken')

      const res = username ?
        await axios.get(`profile/${username}`,{headers:{ token: `Bearer ${userToken}` }}) :
        await axios.get(`timelinePosts/${user._id}`,{headers:{ token: `Bearer ${userToken}` }})
      console.log(res.data, 'kkkkkkkkk');
      setTimelinePosts(res.data)
      //  dispatch(setTimelinePosts(res.data))
    }
    fetchPosts()
  }, [username,user,block])


  return (

    <div className="feed">
      <div className="feedWrapper">

        <Share />

        {timelinePosts.map((obj) => {
          return (
            <Posts key={obj._id} obj={obj} setBlock={setBlock} />
          )
        })

        }

      </div>
    </div>
  );
}