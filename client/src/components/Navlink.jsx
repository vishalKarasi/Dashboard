import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggle } from "@app/services/uiSlice";

function Navlink(props) {
  const dispatch = useDispatch();
  const { label, icon, path, className } = props;

  return (
    <NavLink
      to={path}
      className={className}
      onClick={() => dispatch(toggle("menu"))}
    >
      {icon && icon}
      {label && <label className="label">{label}</label>}
    </NavLink>
  );
}

export default Navlink;
