import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../providers/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const navigate = useNavigate();
  const { register, user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user.userId) navigate("/profile");
  }, [user, navigate]);

  return (
    <>
      <div>Register</div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="current city"
        value={currentCity}
        onChange={(e) => setCurrentCity(e.target.value)}
      />
      <button onClick={() => register(username, currentCity)}>Register</button>
    </>
  );
};

export default Register;
