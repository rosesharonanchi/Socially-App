import "./online.css";

function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightBarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightBarProfileImage"
          src={PF + user.profilePicture}
          alt=""
        />
        <span className="rightBarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}

export default Online;
