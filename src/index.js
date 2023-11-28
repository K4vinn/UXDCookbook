import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ6SCErNxjt7EXnvrQDb1Ek5if2juofJs",
  authDomain: "cookbookuxd.firebaseapp.com",
  projectId: "cookbookuxd",
  storageBucket: "cookbookuxd.appspot.com",
  messagingSenderId: "686693956201",
  appId: "1:686693956201:web:f6dd119475a798fd8200f8",
  measurementId: "G-NNE10V7V4E",
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
