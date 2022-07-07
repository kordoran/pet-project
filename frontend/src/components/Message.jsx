import React from "react";
import "./Message.scss";
import TimeAgo from "react-timeago";
import hungarianStrings from "react-timeago/lib/language-strings/hu";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const Message = ({ message, own }) => {
  const formatter = buildFormatter(hungarianStrings);

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
      <TimeAgo
        className="message-bottom"
        date={message.createdAt}
        formatter={formatter}
      />
    </div>
  );
};

export default Message;
