import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./Conversation.scss";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.userId);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

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
