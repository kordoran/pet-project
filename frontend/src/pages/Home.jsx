import React from "react";
import heroImg from "../images/hero_img.png";
import { useAuth } from "../providers/auth";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import RecentUploads from "../components/RecentUploads";
import { ImGoogle3 } from "react-icons/im";

const Home = () => {
  const { token, auth } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <section className="hero-img">
        <img src={heroImg} alt="hero" />
        <div className="hero-text">
          <h1>Vedd meg, add el!</h1>
          <h4>
            Vásárold meg mások ritkaságait, vagy add el, amire már nincs
            szükséged!
          </h4>
          <div className="search-container">
            <button
              className="search-btn"
              onClick={() => {
                navigate("/all-items");
              }}
            >
              Böngéssz több száz lemez között
            </button>
          </div>
          {!token && (
            <button className="auth-btn" onClick={auth}>
              <span>
                <ImGoogle3 />
              </span>
              Bejelentkezés Google segítségével
            </button>
          )}
        </div>
      </section>
      <div className="separator-bar"></div>
      <h3>Legfrissebb feltöltések</h3>
      <RecentUploads />
    </div>
  );
};

export default Home;
