import axios from "axios";
import React from "react";
import { useEffect } from "react";
import "./Conversation.scss";

function Conversation({ conversation, currentUser }) {
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.userId);

    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:4000/api/users?userId=" + friendId
        );
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
