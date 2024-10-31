import "./message.css";
import {format} from 'timeago.js'

function Message({own, messages}) {
  return (
    <div className={own ? "message own": "message"}>
      <div className="messageTop">
        <img src="assets/pic1.jpg" alt="" className="messageImg" />
        <p className="messageText">{messages.text}</p>
      </div>
      <div className="messageBottom">{format(messages.createdAt)}</div>
    </div>
  );
}

export default Message;
