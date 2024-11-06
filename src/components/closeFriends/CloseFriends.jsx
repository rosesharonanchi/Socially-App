/* eslint-disable react/prop-types */
import "./closeFriends.css";

function CloseFriends({ user }) {
     const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
     console.log(PF + user.profilePicture);
     return (
          <li className="sidebarFriend">
               <img
                    src={PF + user.profilePicture}
                    alt=""
                    className="sidebarFriendImage"
               />
               <span className="sidebarFriendName">{user.username}</span>
          </li>
     );
}

export default CloseFriends;
