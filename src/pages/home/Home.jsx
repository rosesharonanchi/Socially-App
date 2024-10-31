// Home.jsx
import './Home.css';
import SideBar from "../../components/sideBar/SideBar";
import Topbar from "../../components/topBar/Topbar";
import RightBar from "../../components/rightBar/RightBar";
import Feed from "../../components/feed/Feed";
import { useState } from 'react';

const Home = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="homeContainer">
        {/** Render Sidebar conditionally based on the screen size and sidebar state */}
        <div className={`sidebar ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
          <SideBar />
        </div>
        <Feed />
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
