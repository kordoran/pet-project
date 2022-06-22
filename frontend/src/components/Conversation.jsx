import React from "react";
import "./Conversation.scss";

function Conversation() {
  return (
    <div className="conversation">
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="user-icon"
        className="conversation-img"
      />
      <span className="conversation-name">John Doe</span>
    </div>
  );
}

export default Conversation;
