import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const renderAuthLinks = () => (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <button className="btn btn-sm btn-primary" onClick={logout}>
          Logout
        </button>
      </li>
    </>
  );
  return (
    <header>
      <div className="header">
        <ul className="nav nav-pills pull-right">
          {isAuthenticated ? (
            renderAuthLinks()
          ) : (
            <li>
              <button
                className="btn btn-sm btn-primary"
                onClick={loginWithRedirect}
              >
                Login
              </button>
            </li>
          )}
        </ul>
        <h3 className="text-muted">Securing React</h3>
      </div>
    </header>
  );
};

export { Navigation };
