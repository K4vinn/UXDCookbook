import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navigation-bar custom-nav-bar">
      <div className="container">
        <div className="header-title mt-1">The Cookbook</div>

        <div className="collapse navbar-collapse ms-auto" id="navbarNav">
          <ul className="navbar-nav" style={{ color: "#DDF2FD" }}>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "white" }}>
                Home
              </Link>
            </li>

            <NavDropdown
              title="Recipe"
              id="basic-nav-dropdown"
              style={{ color: "white" }}
            >
              <NavDropdown.Item>
                <Link to="/Recipe" style={{ color: "black" }}>
                  Recipe
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/Create" style={{ color: "black" }}>
                  Create
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Account"
              id="basic-nav-dropdown"
              style={{ color: "white" }}
            >
              <NavDropdown.Item>
                <Link to="/Account" style={{ color: "black" }}>
                  Account
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/Favourite" style={{ color: "black" }}>
                  Favourites
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/Login" style={{ color: "black" }}>
                  Login
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/Register" style={{ color: "black" }}>
                  Register
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <li className="nav-item">
              <Link className="nav-link" to="/Cart" style={{ color: "white" }}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
