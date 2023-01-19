
import { Link } from "react-router-dom";
import "./closeFriends.css";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
   <Link to={`/profile/${user.userName}`}> <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePic} alt="" />
      <span className="sidebarFriendName">{user.userName}</span>
    </li></Link>
  );
}