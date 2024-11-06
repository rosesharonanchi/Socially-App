import { useContext, useEffect, useState } from "react";
import Topbar from "../../components/topBar/Topbar";
import instance from "../../components/axios";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";

function Page() {
     const [users, setUsers] = useState(null);
     const { user: currentUser } = useContext(AuthContext);

     const path = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
     console.log(path);

     if (currentUser) {
          console.log(currentUser.followings);
     }

     const fetchUsers = async () => {
          try {
               const response = await instance.get("/users/all");
               setUsers(response.data);
               console.log(users);
          } catch (error) {
               console.log(error);
          }
     };
     useEffect(() => {
          fetchUsers();
     }, []);

     const followUser = async (friendId) => {
          try {
               const response = await instance.put(
                    `/users/${friendId}/follow`,
                    { userId: currentUser._id }
               );

               await instance.post("/conversations/", {
                    senderId: currentUser._id,
                    receiverId: friendId,
               });
               alert(response.data);
          } catch (error) {
               console.log(error);
          }
     };
     return (
          <main>
               <Topbar />
               <div className="main">
                    <h1>Find Friends</h1>
                    {users && (
                         <>
                              {users
                                   .filter(
                                        (user) => user._id !== currentUser._id
                                   )
                                   .map((user) => (
                                        <div
                                             key={user._id}
                                             className="friend-div"
                                        >
                                             <img
                                                  src={
                                                       path +
                                                       (user.profilePicture !==
                                                       ""
                                                            ? user.profilePicture
                                                            : "noAvatarpng.png")
                                                  }
                                                  alt={user.username}
                                             />
                                             <div>
                                                  <h3>{user.username}</h3>
                                                  <button
                                                       onClick={() =>
                                                            followUser(user._id)
                                                       }
                                                  >
                                                       {currentUser?.followings &&
                                                       currentUser?.followings?.find(
                                                            (value) =>
                                                                 value ===
                                                                 user._id
                                                       )
                                                            ? "Unfriend"
                                                            : "Add Friend"}
                                                  </button>
                                             </div>
                                        </div>
                                   ))}
                         </>
                    )}
               </div>
          </main>
     );
}

export default Page;
