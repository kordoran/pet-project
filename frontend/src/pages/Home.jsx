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
      <div className="separator-bar"></div>
      <h3>Legfrissebb feltöltések</h3>
      <section className="latest-updates">
        <div className="card">
          <div className="card-content">
            <div className="card-content-top">
              <img
                src="https://m.media-amazon.com/images/I/91-dFqF+lTL._AC_SL1500_.jpg"
                className="album-cover-img"
                alt="album cover"
              />
              <div className="item-type-tag">VINYL LP</div>
              <p className="album-title-text">Imploding The Mirage</p>
              <p className="album-artist-text">The Killers</p>
            </div>
            <div className="card-content-bottom">
              <div className="cc-bottom-left">
                <p className="uploader-name-text">k.balint22</p>
                <p className="upload-date-text">2022-06-16 12:31</p>
              </div>
              <p className="price-text">5990 Ft</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-content-top">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/8/84/Album_Cover_-_Jubilee_%28Japanese_Breakfast_album%29.jpeg"
                className="album-cover-img"
                alt="album cover"
              />
              <div className="item-type-tag">VINYL LP</div>
              <p className="album-title-text">Jubilee</p>
              <p className="album-artist-text">Japanese Breakfast</p>
            </div>
            <div className="card-content-bottom">
              <div className="cc-bottom-left">
                <p className="uploader-name-text">v_hendo1992</p>
                <p className="upload-date-text">2022-06-12 10:18</p>
              </div>
              <p className="price-text">6480 Ft</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-content-top">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/f/f8/The_Strokes_-_The_New_Abnormal.png"
                className="album-cover-img"
                alt="album cover"
              />
              <div className="item-type-tag">VINYL LP</div>
              <p className="album-title-text">The New Abnormal</p>
              <p className="album-artist-text">The Strokes</p>
            </div>
            <div className="card-content-bottom">
              <div className="cc-bottom-left">
                <p className="uploader-name-text">kek_golyo5</p>
                <p className="upload-date-text">2022-06-13 17:23</p>
              </div>
              <p className="price-text">7200 Ft</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="card-content-top">
              <img
                src="https://www.head-records.com/wp-content/uploads/2017/06/4053.jpg"
                className="album-cover-img"
                alt="album cover"
              />
              <div className="item-type-tag">VINYL LP</div>
              <p className="album-title-text">The Dark Side Of The Moon</p>
              <p className="album-artist-text">Pink Floyd</p>
            </div>
            <div className="card-content-bottom">
              <div className="cc-bottom-left">
                <p className="uploader-name-text">Rokure_1</p>
                <p className="upload-date-text">2022-06-12 09:52</p>
              </div>
              <p className="price-text">4700 Ft</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
