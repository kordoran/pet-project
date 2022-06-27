import React from "react";
import "./Message.scss";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="message_image"
          className="message-img"
        />
        <p className="message-text">{message.text}</p>
      </div>
      <div className="message-bottom">{message.createdAt}</div>
    </div>
  );
};

export default Message;
