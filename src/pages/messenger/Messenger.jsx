import { useContext, useEffect, useRef, useState } from "react";
import ChatOnlline from "../../components/chatOnline/ChatOnlline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/messege/Message";
import Topbar from "../../components/topBar/Topbar"; 
import "./messenger.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../components/axios";
import {io} from "socket.io-client"

function Messenger() { 
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  // const [socket, setSocket] = useState(null);
  const socket = useRef(io("http://localhost:8900"));


  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  
  useEffect(
    ()=>{
  socket.current = io("ws://localhost:8900")
  socket.current.on("getMessage", data =>{
    setArrivalMessages({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
}, []);
 useEffect(()=>{
  arrivalMessages && currentChat?.members.includes(arrivalMessages.sender) && 
  setMessages((prev) => [...prev, arrivalMessages]);
 }, [arrivalMessages, currentChat])

  useEffect(()=>{
    socket.current.emit("addUser", user._id );
    socket.current.on("getUsers", users=>{
     setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId === f )));
    }) 
  }, [user])

   
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);
  
  useEffect(()=>{
  const getMessages = async ()=>{
    try{
      const res = await axios.get(`/messages/${currentChat._id}`);
       setMessages(res.data);
    }
    catch(err){
      console.log(err)
    }
  };
  getMessages()
  },[currentChat])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessages,
      conversationId : currentChat._id,
    };
    const receiverId = currentChat.members.find(member => member !== user._id )
    socket.current.emit("sendMessage",{
      senderId: user._id,
      receiverId,  
      text: newMessages,
    })
    try{ 
  const res =  await axios.post("/messages", message)
  setMessages([...messages, res.data])
  setNewMessages("");
    }
    catch(err){
      console.log(err  )
    }
  };
  
   useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
   },[messages])
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c, i) => (
            <div  onClick={()=>setCurrentChat(c)} key={i}>
               <Conversation conversations={c} currentUser={user} />
            </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {  currentChat ?  (
              <>
              

               <div className="chatBoxTop">
                {messages.map((m)=>(
                     <div ref={scrollRef}>
                       <Message messages={m} own={m.sender === user._id} key={m._id} />
                     </div>
                ))}
                
                 
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something.."
                    onChange={(e)=>setNewMessages(e.target.value)}
                    value={newMessages}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                </div>
              </>) : (
                <span className="noConversationText">Open a conversation to start a chat</span>)
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnlline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />

          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
