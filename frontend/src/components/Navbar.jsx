import React from "react";
import "./Navbar.scss";
import Logo from "../images/logo_nav.svg";
import SmLogo from "../images/vinyl_icon.svg";
import ProfileDropdown from "./ProfileDropdown";
import { CgProfile } from "react-icons/cg";
import { GrMenu } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { useState } from "react";

const Navbar = () => {
  const { auth, token } = useAuth();
  const [dropdown, setDropdown] = useState(false);

  return (
    <nav>
      <div className="left">
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive && "#ee4c1c",
          })}
        >
          {" "}
          Főoldal{" "}
        </NavLink>
        <NavLink
          to="/all-items"
          style={({ isActive }) => ({
            color: isActive && "#ee4c1c",
          })}
        >
          {" "}
          Lemezek{" "}
        </NavLink>
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
