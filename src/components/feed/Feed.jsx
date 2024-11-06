/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";

import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import axios from "../axios";
import { AuthContext } from "../../context/AuthContext";

function Feed({ username }) {
     const [posts, setPosts] = useState([]);
     const { user } = useContext(AuthContext);
     const [refetchPosts, setRefetchPosts] = useState("");

     useEffect(() => {
          const fetchPosts = async () => {
               const res = username
                    ? await axios.get(`/posts/profile/${username}`)
                    : await axios.get(`/posts/timeline/${user._id}`);
               setPosts(
                    res.data.sort((p1, p2) => {
                         return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
               );
          };
          fetchPosts();
     }, [username, user._id, refetchPosts]);

     const savePost = async (post) => {
          try {
               // Post the data (text and/or image)
               await axios.post("/posts", post);
               setRefetchPosts(btoa(Math.random()));
               alert("Post uploaded successfully");
          } catch (err) {
               console.log("Post creation failed:", err);
          }
     };
     return (
          <div className="feed">
               <div className="feedWrapper">
                    {(!username || username === user.username) && (
                         <Share savePost={savePost} />
                    )}
                    {posts.map((p) => (
                         <Post post={p} key={p._id} />
                    ))}
               </div>
          </div>
     );
}

export default Feed;
