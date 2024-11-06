/* eslint-disable react/prop-types */
import "./rightBar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MdAdd, MdRemove } from "react-icons/md";

function RightBar({ user }) {
     const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
     const [friends, setFriends] = useState([]);
     const { user: currentUser, dispatch } = useContext(AuthContext);
     const [followed, setFollowed] = useState(
          currentUser.followings.includes(user?._id)
     );

     useEffect(() => {
          setFollowed(currentUser.followings.includes(user?._id));
     }, []);

     useEffect(() => {
          const getFriends = async () => {
               if (user && user._id) {
                    try {
                         const friendList = await axios.get(
                              "/users/friends/" + user._id
                         );
                         console.log(friendList.data);
                         setFriends(friendList.data);
                    } catch (err) {
                         console.log(err);
                    }
               }
          };
          getFriends();
     }, [user]);

     const handleClick = async () => {
          try {
               if (followed) {
                    await axios.put("/users/" + user._id + "/unfollow", {
                         userId: currentUser._id,
                    });
                    dispatch({ type: "UNFOLLOW", payload: user._id });
               } else {
                    await axios.put("/users/" + user._id + "/follow", {
                         userId: currentUser._id,
                    });
                    dispatch({ type: "FOLLOW", payload: user._id });
               }
          } catch (err) {
               console.log(err);
          }
          setFollowed(!followed);
     };

     const HomeRightbar = () => {
          return (
               <>
                    <div className="birthdayContainer">
                         <img
                              className="birthdayImage"
                              src={`${PF}gift.png`}
                              alt=""
                         />
                         <span className="birthdayText">
                              <b>Itz Kathleen </b> and <b>3 other friends </b>{" "}
                              have a birthday today .
                         </span>
                    </div>
                    <img src={`${PF}pic4.jpg`} alt="" className="rightbarAd" />
                    <h4 className="rightbarTitle">Online Friends</h4>
                    <ul className="rightbarFriendList">
                         {Users.map((u) => (
                              <Online user={u} key={u.id} />
                         ))}
                    </ul>
               </>
          );
     };

     const ProfileRightBar = () => {
          return (
               <>
                    {user.username !== currentUser.username && (
                         <button
                              className="rightBarFollowBtn"
                              onClick={handleClick}
                         >
                              {followed ? "Unfollow" : "Follow"}
                              {followed ? <MdRemove /> : <MdAdd />}
                         </button>
                    )}
                    <h4 className="rightBarTitle">User Information title</h4>
                    <div className="rightbarInfo">
                         <div className="rightbarInfoItem">
                              <span className="rightbarInfoKey">City:</span>
                              <span className="rightbarInfoValue">
                                   {user.city}
                              </span>
                         </div>
                         <div className="rightbarInfoItem">
                              <span className="rightbarInfoKey">
                                   Relationship:
                              </span>
                              <span className="rightbarInfoValue">
                                   {user.relationship === 1
                                        ? "Single"
                                        : user.relationship === 2
                                        ? "Married"
                                        : "-"}
                              </span>
                         </div>
                         <div className="rightbarInfoItem">
                              <span className="rightbarInfoKey">From:</span>
                              <span className="rightbarInfoValue">
                                   {user.from}
                              </span>
                         </div>
                    </div>

                    <h4 className="rightBarTitle">User Friends</h4>
                    <div className="rightbarFollowings">
                         {friends.map((friend, i) => (
                              <Link
                                   to={"/profile/" + friend.username}
                                   key={i}
                                   style={{ textDecoration: "none" }}
                              >
                                   <div className="rightbarfollowing">
                                        <img
                                             src={
                                                  friend.profilePicture
                                                       ? PF +
                                                         friend.profilePicture
                                                       : PF + "noAvatarpng.png"
                                             }
                                             alt=""
                                             className="rightbarfollowingImg"
                                        />
                                        <span className="rightbarFollowingName">
                                             {friend.username}
                                        </span>
                                   </div>
                              </Link>
                         ))}
                    </div>
               </>
          );
     };

     return (
          <div className="rightBar">
               <div className="rightBarWrapper">
                    {user ? <ProfileRightBar /> : <HomeRightbar />}
               </div>
          </div>
     );
}

export default RightBar;
