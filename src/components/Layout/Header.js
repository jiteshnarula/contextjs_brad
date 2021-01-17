import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ branding }) => {
  return (
    <nav class="navbar dark">
      <a href="">{branding}</a>
      <ul class="list-group">
        <li class="list-group-item">
          <Link style={{ textDecoration: "none" }} to="/" class="mr-auto">
            Home
          </Link>
        </li>
        <li class="list-group-item">
          <Link
            style={{ textDecoration: "none" }}
            to="/addcontact"
            class="mr-auto"
          >
            Add Contact
          </Link>
        </li>
        <li class="list-group-item">
          <Link style={{ textDecoration: "none" }} to="/about" class="mr-auto">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
