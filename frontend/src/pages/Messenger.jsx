import React from "react";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import "./Messenger.scss";

const Messenger = () => {
  return (
    <section className="messenger">
      <div className="chat-menu">
        <div className="chat-menu-wrapper">
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </div>
      <div className="chat-box">
        <div className="chat-box-wrapper">
          <div className="chat-box-top">
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
          </div>
          <div className="chat-box-bottom">
            <textarea
              className="chat-input"
              placeholder="Write something"
            ></textarea>
            <button className="submit-btn">Send</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messenger;
