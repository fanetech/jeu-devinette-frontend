import React from "react";
import { menu } from "../services/LinkMapp";

const Navbar = () => {
  return (
    <div className="navbar-container" style={{ marginBottom: "30px" }}>
      <nav class="navbar">
        <div class="navbar-container container">
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <ul class="menu-items">
            {menu.map((m, index) => (
              <li key={index}>
                <a href={m.link}>{m.text}</a>
              </li>
            ))}
          </ul>
          <h1 class="logo">Fane Game</h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
