import "./rightbar.css";
// import Online from "../online/Online";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../../Axios/axios"
import { Link } from "react-router-dom";


export default function Rightbar({ user }) {
  const userToken = localStorage.getItem('userToken')
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [sugList, setSugList] = useState([])
  const [followed, setFollowed] = useState(false)
  const [friendsList, setFriendsList] = useState([])


  //registered user
  const currentUser = useSelector((state) => {
    return state.userData.data
  })


  useEffect(() => {
    const frndSugg = async () => {
      const suggestions = await axios.get(`friendsSuggestion`, { headers: { token: `Bearer ${userToken}` } })
      console.log('suggestions ', suggestions.data);
      setSugList(suggestions.data)
    }
    frndSugg()
  }, [])

  useEffect(() => {
    const frndList = async () => {
      const friends = await axios.get(`frinedsList/${user._id}`, { headers: { token: `Bearer ${userToken}` } })
      console.log('friends ', friends.data);
      setFriendsList(friends.data)
    }
    frndList()
  }, [user])


  // useEffect(()=>{
  //   setFollowed(currentUser.following.includes(user._id))
  // },[])

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.post("unfollow/" + user._id, { userId: currentUser._id }, { headers: { token: `Bearer ${userToken}` } }).then((res) => {
          console.log("unfollow", res.data);
        })
      } else {
        await axios.post("follow/" + user._id, { userId: currentUser._id }, { headers: { token: `Bearer ${userToken}` } }).then((res) => {
          console.log('follow', res.data);
        })
      }

    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed)
  }

  const HomeRightbar = () => {
    return (
      <>

        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}

        <h4 className="rightbarTitle">Suggestion For You</h4>
        {sugList.map((sugg) => {
          return (
            currentUser._id != sugg._id &&

            <div key={sugg._id}>
              {!sugg.followers.includes(currentUser._id) ?
                (<div className="rightbarFollowings">
                  <Link to={`/profile/${sugg.userName}`}  >
                    <div className="rightbarFollowing" >
                      <img
                        src={PF + sugg.profilePic}
                        alt=""
                        className="rightbarFollowingImg"
                      />
                      <span className="rightbarFollowingName">{sugg.userName}</span>
                    </div>
                  </Link>

                </div>) : ""}
            </div>
          )
        })}

        {/* <h4 className="rightbarTitle">Online Friends</h4> */}
        <ul className="rightbarFriendList">
          {/* {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.userName !== currentUser.userName && (<button className="followbutton" onClick={handleFollow}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <RemoveIcon /> : <AddIcon />}
        </button>)}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          {/* <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div> */}
        </div>
        <div className="followers">
          <h4 className="rightbarTitle">followers</h4><span>{friendsList.length}</span>
        </div>
        <div className="rightbarFollowings">
          {friendsList.map((friend) => {
            return (
              <div key={friend._id} className="rightbarFollowing">
                <img
                  src={PF + friend.profilePic}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.userName}</span>
              </div>
            )
          })}


        </div>
      </>
    );
  };


  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}

      </div>
    </div>
  );
}