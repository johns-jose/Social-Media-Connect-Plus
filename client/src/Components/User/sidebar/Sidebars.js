import "./sidebars.css";
// import RssFeedIcon from '@mui/icons-material/RssFeed';
// import ChatIcon from '@mui/icons-material/Chat';
import CloseFriend from "../closeFriends/CloseFriends";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from '../../../Axios/axios'
import { Link } from "react-router-dom";

export default function Sidebars() {
  const userToken = localStorage.getItem('userToken')
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const user = useSelector((state) => {
    return state.userData.data
  })
  const [searchName, setSearchName] = useState('')
  const [friendsList, setFriendsList] = useState([])
  const [searchResult, setSearchResult] = useState([])
  useEffect(() => {
    const frndList = async () => {
      const friends = await axios.get(`frinedsList/${user._id}`, { headers: { token: `Bearer ${userToken}` } })
      console.log('friends ', friends.data);
      setFriendsList(friends.data)
    }
    frndList()
  }, [user])
  console.log('searchName', searchName);
  const handleSearch = async (e) => {
    const val = e.target.value
    setSearchName(val)
    if (val != "") {
      const result = await axios.get(`search/${searchName}`)
      console.log('result', result.data);
      setSearchResult(result.data)
    } else {
      setSearchResult([])
    }

  }
  axios.get(`search/${searchName}`)


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">

        {/* <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul> */}
        {/* <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" /> */}
        <input placeholder="Search for friends" type="text" className="chatMenuInput" value={searchName} onChange={handleSearch} />

        {searchResult?.map((item) => {
          return (
            <>
              <div key={item._id}>
                <Link to={`/profile/${item.userName}`}>
                  <a class="flex items-center px-3 py-2 text-sm transition duration-150  ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-800 hover:text-blue-300 focus:outline-none">
                    <img class="object-cover w-10 h-10 rounded-full"
                      src={PF + item?.profilePic} alt="username"
                    />
                    <div class="w-full pb-2">
                      <div class="flex justify-between">
                        <span class="block ml-2 font-semibold text-black">{item?.userName}</span>
                      </div>

                    </div>
                  </a>
                </Link>

              </div>:""
            </>
          )
        })}

        <h4 className="rightbarTitle">Friends</h4>
        <ul className="sidebarFriendList">
          {friendsList.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}