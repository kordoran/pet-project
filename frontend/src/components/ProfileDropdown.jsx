import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth";
import "./ProfileDropdown.scss";

function Dropdown() {
  const [dropdown, setDropdown] = useState(false);
  const { logout } = useAuth();

  function clickNavItem() {
    setDropdown(false);
    logout();
  }

  return (
    <>
      <ul
        className={dropdown ? "profile-submenu clicked" : "profile-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
        <li>
          <Link
            to="/all-items"
            className="dropdown-nav-item hidden"
            onClick={() => setDropdown(false)}
          >
            Lemezek
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="dropdown-nav-item"
            onClick={() => setDropdown(false)}
          >
            Profilom
          </Link>
        </li>
        <li>
          <Link
            to="/messenger"
            className="dropdown-nav-item"
            onClick={() => setDropdown(false)}
          >
            Üzenetek
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="dropdown-nav-item"
            onClick={() => clickNavItem()}
          >
            Kijelentkezés
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;
