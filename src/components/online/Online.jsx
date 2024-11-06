/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "./online.css";

function Online({ user }) {
     const PF =
          import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER ??
          "http://localhost:8800/images/";
     return (
          <li className="rightBarFriend">
               <div className="rightbarProfileImgContainer">
                    <img
                         className="rightBarProfileImage"
                         src={PF + user.profilePicture}
                         alt=""
                    />
                    <span className="rightBarOnline"></span>
               </div>
               <span className="rightbarUsername">{user.username}</span>
          </li>
     );
}

export default Online;
