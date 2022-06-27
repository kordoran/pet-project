import React from "react";
import heroImg from "../images/hero_img.png";
import "./Home.scss";
import { ImGoogle3 } from "react-icons/im";
import { useAuth } from "../providers/auth";

const Home = () => {
  const { auth, token } = useAuth();

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
            <input
              type="text"
              placeholder="Keress lemezre, zenészre vagy zenekarra"
            />
            <button className="search-btn">Keresés</button>
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
      <p>{token ? "Logged in" : "Anonymous"}</p>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
