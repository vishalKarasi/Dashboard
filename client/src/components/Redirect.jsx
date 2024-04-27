import React, { useCallback } from "react";

function Redirect(props) {
  const { icon, link, label } = props;

  const handleRedirect = useCallback(() => {
    window.location.href = link;
  }, [link]);

  return (
    <li onClick={handleRedirect}>
      {icon && icon}
      {label && <label>{label}</label>}
    </li>
  );
}

export default Redirect;
