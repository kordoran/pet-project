import React from "react";
import "./Navbar.scss";
import Logo from "../images/logo_nav.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Navbar = () => {
  const { auth, token, logout } = useAuth();
  const navigate = useNavigate();
  const nav = (path) => {
    //console.log("rerouting..."); // elagazás, ciklusok, bármit meg lehet itt írni, hogy a végén legyen, hogy meghívódik a navigate a path-szal
    navigate(path);
  };
  return (
    <nav>
      <div className="left">
        {/*<button onClick={() => navigate("/profile")}>Profile</button>*/}
        <Link to="/"> Menü </Link>
        <Link to="/about"> Lemezek </Link>
        <Link to="/profile"> Újdonságok </Link>
      </div>
      <img src={Logo} alt="Hangbörze Logo" />
      <div className="right">
        {!token ? (
          <button onClick={auth}>Bejelentkezés</button>
        ) : (
          <button onClick={logout}>Profil</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
