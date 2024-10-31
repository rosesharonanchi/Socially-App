import "./sideBar.css";
import { MdRssFeed } from "react-icons/md";
import {
  MdVideocam,
  MdChat,
  MdGroup,
  MdWork,
  MdSettings,
  MdStore,
} from "react-icons/md";
import { Users } from "../../dummyData";
import CloseFriends from "../closeFriends/CloseFriends";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <MdRssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <MdVideocam className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <MdChat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <MdGroup className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <MdWork className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <MdSettings className="sidebarIcon" />
            <span className="sidebarListItemText">Settingd</span>
          </li>
          <li className="sidebarListItem">
            <MdStore className="sidebarIcon" />
            <span className="sidebarListItemText">Market place</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriends user={u} key={u.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
