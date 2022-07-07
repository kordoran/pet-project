import React from "react";
import "./Navbar.scss";
import Logo from "../images/logo_nav.svg";
import SmLogo from "../images/vinyl_icon.svg";
import ProfileDropdown from "./ProfileDropdown";
import { CgProfile } from "react-icons/cg";
import { GrMenu } from "react-icons/gr";
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
        <Link to="/all-items"> Lemezek </Link>
      </div>
      <Link to="/">
        <img src={Logo} alt="Hangbörze Logo" className="full-logo" />
        <img src={SmLogo} alt="Hangbörze Logo" className="small-logo" />
      </Link>
      <div className="right">
        {!token && !dropdown ? (
          <button onClick={auth}>Bejelentkezés</button>
        ) : (
          <div
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <CgProfile className="profile-icon" />
            <GrMenu className="hamburger-menu-icon" />
            {dropdown && <ProfileDropdown />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
