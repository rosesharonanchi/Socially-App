// Topbar.jsx
import "./topbar.css";
import { FaSearch } from "react-icons/fa";
import { MdPerson, MdNotifications, MdChat } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Topbar({ toggleSidebar }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbar__container">
      <div className="topbar__left" onClick={toggleSidebar} style={{ cursor: "pointer" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Socially</span>
        </Link>
      </div>
      <div className="topbar__center">
        <div className="search__bar">
          <FaSearch className="searchIcon" />
          <input
            placeholder="Search for friends, post"
            className="search__input"
          />
        </div>
      </div>
      <div className="topbar__right">
        <div className="topbar__links">
          <span className="topbar__link">Homepage</span>
          <span className="topbar__link">Timeline</span>
        </div>
        <div className="topbar__Icons">
          <div className="topbar__Icons__Item">
            <MdPerson />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={'/messenger'} className="topbar__Icons__Item">
            <MdChat />
            <span className="topbarIconBadge">1</span>
          </Link>
          <div className="topbar__Icons__Item">
            <MdNotifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture ? PF + user.profilePicture : PF + "noAvatarpng.png"}
              className="topbarImg"
              alt="pic"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
