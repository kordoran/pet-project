import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../providers/auth";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import "./Messenger.scss";
import axios from "axios";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user, token } = useAuth();
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/conversations/" + user.userId,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user.userId, token]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/messages/" + currentChat?._id,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/messages",
        message,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessages([...messages], res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                {messages.map((m, i) => (
                  <div ref={scrollRef} key={i}>
                    <Message message={m} own={m.sender === user.userId} />
                  </div>
                ))}
              </div>
              <div className="chat-box-bottom">
                <textarea
                  className="chat-input"
                  placeholder="Write something"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="submit-btn" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <h4 className="no-msg-select">
              Kezdeményezz beszélgetést az adott termék oldalán, az{" "}
              <span>Üzenet a hirdetőnek</span> gombra kattintva, vagy válassz a
              bal oldali sávból
            </h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messenger;
