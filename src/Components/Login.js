import React, { useState } from "react";
import "../Style/Login.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import NavigationBar from "./NavigationBar";

function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Successfully logged in!");
    } catch (error) {
      console.error("Error Logging In: ", error.message);
    }
  };

  return (
    <>
      <NavigationBar />
      <h3 className="welcome" style={{ textDecoration: "underline" }}>
        Welcome back to The Cookbook
      </h3>
      <h3 className="welcome" style={{ fontSize: "25px" }}>
        Login back to your account now!
      </h3>
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={email}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </form>
                <p className="reset-text">
                  Forgot your password?
                  <a className="reset-text"> Reset Now </a>
                </p>
              </div>
            </div>
            <p className="register-text">
              Don't have an account?
              <a className="register-text"> Register Here </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
