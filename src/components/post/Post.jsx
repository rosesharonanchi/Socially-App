import "./post.css";
import { MdMoreVert } from "react-icons/md";
import { MdFavorite, MdThumbUp } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put("/post/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImage"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatarpng.png"
                }
                alt=""
              />
            </Link>

            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MdMoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImage"
            src={process.env.REACT_APP_BASE_URL + post.img}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <MdThumbUp
              className="likeIcon"
              color="gray"
              onClick={likeHandler}
            />
            <MdFavorite
              className="likeIcon"
              color="tomato"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
