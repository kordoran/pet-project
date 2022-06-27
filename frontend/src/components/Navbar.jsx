import React from "react";
import "./Navbar.scss";
import Logo from "../images/logo_nav.svg";
import ProfileDropdown from "./ProfileDropdown";
import { CgProfile } from "react-icons/cg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useState } from "react";

const Navbar = () => {
  const { auth, token } = useAuth();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const nav = (path) => {
    //console.log("rerouting..."); // elagazás, ciklusok, bármit meg lehet itt írni, hogy a végén legyen, hogy meghívódik a navigate a path-szal
    navigate(path);
  };
  return (
    <nav>
      <div className="left">
        <Link to="/"> Főoldal </Link>
        <Link to="/about"> Lemezek </Link>
        <Link to="/profile"> Újdonságok </Link>
      </div>
      <img src={Logo} alt="Hangbörze Logo" />
      <div className="right">
        {!token && !dropdown ? (
          <button onClick={auth}>Bejelentkezés</button>
        ) : (
          <div
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <CgProfile />
            {dropdown && <ProfileDropdown />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
