import React from "react";
import heroImg from "../images/hero_img.png";
import vinylCloseup from "../images/vinyl_closeup.jpg";
import { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import TextField from "@mui/material/TextField";

const Register = () => {
  const [username, setUsername] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const navigate = useNavigate();
  const { register, user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user.userId) navigate("/profile");
  }, [user, navigate]);

  console.log(user);

  return (
    <div className="register">
      <section>
        <img src={heroImg} alt="hero" />
        <div className="reg-box">
          <div className="reg-text">
            <h3>
              Köszönjük, hogy bejelentkeztél a Google fiókod segítségével!
            </h3>
            <h5>
              A regisztráció befejezéséhez, kérjük adj meg egy felhasználónevet,
              illetve a tartózkodási helyed!
            </h5>
          </div>
          <form className="reg-form">
            <TextField
              variant="standard"
              label="Felhasználónév"
              placeholder="Írjon be egy tetszőleges felhasználónevet"
              value={username}
              className="reg-input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="standard"
              label="Jelenlegi tartózkodási hely"
              placeholder="pl. Budapest"
              value={currentCity}
              className="reg-input"
              onChange={(e) => setCurrentCity(e.target.value)}
            />
            <button onClick={() => register(username, currentCity)}>
              Regisztráció
            </button>
          </form>
        </div>
      </section>
      <img src={vinylCloseup} alt="hero" className="reg-colorfill" />
    </div>
  );
};

export default Register;
