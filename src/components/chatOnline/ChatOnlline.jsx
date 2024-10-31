import { useEffect, useState } from 'react';
import './chatOnline.css';
import axios from "../../components/axios";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
   const [friends, setFriends] = useState([]);
   const [onlinefriends, setOnlineFriends] = useState([]);
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   useEffect(() => {
      const getFriends = async () => {
         const res = await axios.get("/users/friends/" + currentId);
         setFriends(res.data);
      };
      getFriends();
   }, [currentId]);

   useEffect(() => {
      setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
   }, [friends, onlineUsers]);

   console.log(onlineUsers);


   const handleClick = async (user) =>{
    try{
         const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
         setCurrentChat(res.data)
    }
    catch(err){
      console.log(err)
    }
   }

   return (
      <div className='chatOnline'>
         {onlinefriends.map(o => (
            <div className="chatOnlineFriend" key={o._id} onClick={()=>handleClick(o)}>
               <div className="chatOnlineImgContainer">
                  <img
                     src={o?.profilePicture ? PF + o.profilePicture : PF + "noAvatarpng.png"}
                     alt=""
                     className="chatOnlineImg"
                  />
                  <div className="chatOnlineBadge"></div>
               </div>
               <div className="chatOnlineName">{o.username}</div>
            </div>
         ))}
      </div>
   );
}

export default ChatOnline;
