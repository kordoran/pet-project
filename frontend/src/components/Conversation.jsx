import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./Conversation.scss";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.userId);

    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:4000/api/user?userId=" + friendId
        );
        setUser(res.data);
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
      <span className="conversation-name">{user?.username}</span>
    </div>
  );
}

export default Conversation;
