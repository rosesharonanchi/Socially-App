import "./profile.css";
import SideBar from "../../components/sideBar/SideBar";
import Topbar from "../../components/topBar/Topbar";
import RightBar from "../../components/rightBar/RightBar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import axios from "../../components/axios";
import { useParams } from "react-router";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />

      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF +user.coverPicture: PF + "noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ?  PF + user.profilePicture : PF + "noAvatarpng.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <h4 className="profileInfoDesc">{user.desc}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
