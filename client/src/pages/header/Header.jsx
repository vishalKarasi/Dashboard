import "./header.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBars,
  FaTimes,
  FaChartArea,
  FaTable,
  FaChartPie,
  FaMoon,
  FaSun,
  FaPowerOff,
  FaPalette,
} from "react-icons/fa";

import { setTheme, toggle, toggleMode } from "@app/services/uiSlice.js";
import Navlink from "@components/Navlink.jsx";
import { logout } from "@app/services/authSlice.js";
import Button from "@components/button/Button.jsx";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, mode, menu } = useSelector((state) => state.ui);
  const { admin, status } = useSelector((state) => state.admin);

  const NavData = [
    { label: "Table Insight", path: "/table", icon: <FaTable /> },
    { label: "Charts Insight", path: "/chart", icon: <FaChartArea /> },
    { label: "Graphs Insight", path: "/graph", icon: <FaChartPie /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
    if (status === "success") navigate("/");
  };

  return (
    <header id="header">
      <span className="menu" onClick={() => dispatch(toggle("menu"))}>
        {menu ? <FaTimes /> : <FaBars />}
      </span>

      <ul className="setting">
        <li className="mode" onClick={() => dispatch(toggleMode())}>
          <label>{mode === "light" ? <FaMoon /> : <FaSun />}</label>
        </li>
        <li className="theme">
          <input
            type="color"
            value={theme}
            id="theme"
            onChange={(event) => dispatch(setTheme(event.target.value))}
          />
          <label className="label" htmlFor="theme">
            <FaPalette />
          </label>
        </li>
        <Link to="/profile" className="profile">
          <img src={admin.profilePic} alt="profile" />
        </Link>
      </ul>

      <aside className={menu ? "active" : ""}>
        <nav>
          {NavData.map((link) => (
            <Navlink key={link.label} {...link} className="navlink" />
          ))}
        </nav>
        <Button
          label="Logout"
          icon={<FaPowerOff />}
          onClick={handleLogout}
          className="btn-primary"
        />
      </aside>
    </header>
  );
}

export default Header;
