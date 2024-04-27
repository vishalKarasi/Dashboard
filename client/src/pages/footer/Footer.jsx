import "./footer.scss";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <nav>
        <Link to="/table">Table</Link>
        <Link to="/graph">Graph</Link>
        <Link to="/chart">Chart</Link>
      </nav>
      <div className="copyrightInfo">Copyright under 2024</div>
      <h1>Logo</h1>
    </footer>
  );
}

export default Footer;
