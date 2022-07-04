import React from "react";
import "./Footer.scss";
import Logo from "../images/full_logo_white.svg";
import { useAuth } from "../providers/auth";
import { Link } from "react-router-dom";

const Footer = () => {
  const { token } = useAuth();

  return (
    <footer>
      <div className="footer-logo-box">
        <img src={Logo} alt="Hangbörze Logo" />
        <a href="mailto:kapcsolat@hangborze.hu" className="footer-subtext">
          kapcsolat@hangborze.hu
        </a>
        <p className="footer-subtext">Instagram</p>
      </div>
      <div className="footer-albums-box">
        <h6>Lemezek</h6>
        <Link to="/" className="footer-subtext">
          Felfedezés
        </Link>
        <Link to="/" className="footer-subtext">
          Előadók
        </Link>
        <Link to="/" className="footer-subtext">
          Legfrissebb feltöltések
        </Link>
      </div>
      {token && (
        <div className="footer-profile-box">
          <h6>Profil</h6>
          <Link to="/messenger" className="footer-subtext">
            Üzenetek
          </Link>
          <Link to="/profile" className="footer-subtext">
            Profilom
          </Link>
        </div>
      )}
      <div className="footer-general-box">
        <h6>Általános tudnivalók</h6>
        <Link to="/" className="footer-subtext">
          Rólunk
        </Link>
        <Link to="/" className="footer-subtext">
          Kapcsolat
        </Link>
        <Link to="/" className="footer-subtext">
          Általános szerződési feltételek
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
