/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "../axios";

function Conversation({ conversations, currentUser }) {
     const [user, setUser] = useState(null);
     const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
     useEffect(() => {
          const friendId = conversations.members.find(
               (m) => m !== currentUser._id
          );
          const getUser = async () => {
               try {
                    const res = await axios("/users?userId=" + friendId);
                    setUser(res.data);
               } catch (err) {
                    console.log(err);
               }
          };
          getUser();
     }, [currentUser, conversations]);

     return (
          <div className="conversation">
               <img
                    src={
                         user?.profilePicture
                              ? PF + user.profilePicture
                              : PF + "noAvatarpng.png"
                    }
                    alt=""
                    className="conversationImg"
               />
               <span className="conversationName">
                    {user ? user.username : "Loading..."}
               </span>
          </div>
     );
}

export default Conversation;
