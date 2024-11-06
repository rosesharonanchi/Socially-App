/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import {
     MdImage,
     MdLabel,
     MdRoom,
     MdEmojiEmotions,
     MdCancel,
} from "react-icons/md";
import axios from "../axios";

function Share({ savePost }) {
     const { user } = useContext(AuthContext);
     const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
     const desc = useRef();
     const [file, setFile] = useState(null);

     const submitHandler = async (e) => {
          e.preventDefault();

          // Check if there's either text or a file to submit
          if (!desc.current.value && !file) {
               alert(
                    "Please add some text or upload a file before submitting."
               );
               return;
          }

          const newPost = {
               userId: user._id,
               desc: desc.current.value || "", // Use empty string if no description
          };

          // If there's a file, upload it
          if (file) {
               const data = new FormData();
               data.append("file", file);
               try {
                    const res = await axios.post("/upload", data, {
                         headers: { "Content-Type": "multipart/form-data" },
                    });
                    newPost.img = res.data.filePath; // Add image URL to the newPost object
               } catch (err) {
                    console.log("File upload failed:", err);
                    return; // Prevent further execution if file upload fails
               }
          }

          //  Call function here
          await savePost(newPost);
          desc.current.value = "";
     };

     return (
          <div className="share">
               <div className="shareWrapper">
                    <div className="shareTop">
                         <img
                              className="postProfileImage"
                              src={
                                   user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "noAvatarpng.png"
                              }
                              alt=""
                         />
                         <input
                              type="text"
                              className="shareInput"
                              ref={desc}
                              placeholder={
                                   "What's on your mind " + user.username + "?"
                              }
                         />
                    </div>
                    <hr className="shareHr" />
                    {file && (
                         <div className="shareImgContainer">
                              <img
                                   className="shareImg"
                                   src={URL.createObjectURL(file)}
                                   alt=""
                              />
                              <MdCancel
                                   className="shareCancelImg"
                                   onClick={() => setFile(null)}
                              />
                         </div>
                    )}
                    <form className="shareBottom" onSubmit={submitHandler}>
                         <div htmlFor="file" className="shareOptions">
                              <label className="shareOption">
                                   <MdImage
                                        color="tomato"
                                        className="shareIcon"
                                   />
                                   <span className="shareOptionText">
                                        Photo or video
                                   </span>
                                   <input
                                        type="file"
                                        style={{ display: "none" }}
                                        name=""
                                        id="file"
                                        accept=".png, .jpeg, .jpg"
                                        onChange={(e) =>
                                             setFile(e.target.files[0])
                                        }
                                   />
                              </label>
                              <div className="shareOption">
                                   <MdLabel
                                        color="blue"
                                        className="shareIcon"
                                   />
                                   <span className="shareOptionText">Tag</span>
                              </div>
                              <div className="shareOption">
                                   <MdRoom
                                        color="
              green"
                                        className="shareIcon"
                                   />
                                   <span className="shareOptionText">
                                        Location
                                   </span>
                              </div>
                              <div className="shareOption">
                                   <MdEmojiEmotions
                                        color="goldenrod"
                                        className="shareIcon"
                                   />
                                   <span className="shareOptionText">
                                        Feelings
                                   </span>
                              </div>
                         </div>
                         <button type="submit" className="shareButton">
                              Share
                         </button>
                    </form>
               </div>
          </div>
     );
}

export default Share;
