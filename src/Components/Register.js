import NavigationBar from "./NavigationBar";
import { useState, userState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Password and Confirm Password do not match.");
      return;
    }

    try {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const userId = userCredentials.user.uid;
      await firebase.firestore().collection("users").doc(userId).set({
        username,
        email,
      });
      console.log("User successfully registered!");
    } catch (error) {
      console.log("Error registering user:", error.message);
    }
  };

  return (
    <>
      <NavigationBar />
      <h3 className="welcome" style={{ textDecoration: "underline" }}>
        Welcome to The Cookbook
      </h3>
      <h3 className="welcome" style={{ fontSize: "25px" }}>
        Register an account to our cookbook!
      </h3>
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Register</h3>
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
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
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmpassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Register Account
                    </button>
                  </div>
                </form>
                <p className="reset-text">
                  Already have an account?
                  <a className="reset-text"> Back to Login </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
