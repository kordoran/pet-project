import React, { useEffect } from "react";
import { useAuth } from "../providers/auth";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import "./Messenger.scss";
import { useState } from "react";
import axios from "axios";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user.userId);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
      getConversations();
    };
  }, [user.userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages" + currentChat._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  return (
    <section className="messenger">
      <div className="chat-menu">
        <div className="chat-menu-wrapper">
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chat-box">
        <div className="chat-box-wrapper">
          {currentChat ? (
            <>
              <div className="chat-box-top">
                {messages.map((m) => (
                  <Message message={m} own={m.sender === user.userId} />
                ))}
              </div>
              <div className="chat-box-bottom">
                <textarea
                  className="chat-input"
                  placeholder="Write something"
                ></textarea>
                <button className="submit-btn">Send</button>
              </div>
            </>
          ) : (
            <span>Kezdj el beszélgetni</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messenger;
