import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Home.css";
import Pizza from "../Vectors/pizza-header.png";
import Ellipse from "../Vectors/Ellipse-1.png";
import frame1 from "../Vectors/Frame 1.png";
import frame2 from "../Vectors/Frame 2.png";
import frame3 from "../Vectors/frame 3.png";
import NavigationBar from "./NavigationBar";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [randomMeals, setRandomMeals] = useState([]);

  const navigate = useNavigate();

  const fetchRandomMeals = async () => {
    try {
      const db = firebase.firestore();

      const snapshot = await db.collection("meals").get();
      const meals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const randomMeals = [];

      // Randomly select 4 meals
      while (randomMeals.length < 4 && meals.length > 0) {
        const randomIndex = Math.floor(Math.random() * meals.length);
        randomMeals.push(meals.splice(randomIndex, 1)[0]);
      }

      setRandomMeals(randomMeals);
    } catch (error) {
      console.error("Error fetching random meals:", error.message);
    }
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

  const toPage = () => {
    navigate("/Recipe");
  };

  const toPage2 = () => {
    navigate("/Favourite");
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="row">
          {/* Image Column */}
          <div className="col-md-6">
            <img className="img-2" src={Ellipse} alt="Pizza" />
            <img className="img-1" src={Pizza} alt="Pizza" />
          </div>

          {/* Text Column */}
          <div className="col-md-6">
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="landing">Your Very Own</h1>
                  <h1 className="landing-2">Personal Cookbook</h1>
                  <button className="view-recipe-btn" onClick={toPage}>
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 box">
        <div className="rectangle">
          <h3 className="for-you">For you</h3>
          <div className="container d-flex flex-wrap justify-content-between">
            {randomMeals.map((meal) => (
              <Link to={`/recipe/${meal.id}`}>
                <div className="outer-card" key={meal.id}>
                  <div className="inner-card">
                    <img
                      style={{
                        objectFit: "fill",
                        height: "300px",
                        width: "300px",
                        borderRadius: "15px",
                      }}
                      src={meal.strMealThumb}
                      alt={meal.name}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      textDecoration: "none",
                      textDecorationStyle: "none",
                      color: "black",
                    }}
                    className="card-content"
                  >
                    {meal.strMeal}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <hr className="line-for-you" />
          <div className="container d-flex flex-wrap justify-content-between">
            <h3 className="save-recipe">
              Looking to <br /> Save
              <br /> Your Recipes? <br />
              <button
                className="primary-btn"
                style={{
                  backgroundColor: "#0d6efd",
                  border: "none",
                  borderRadius: "15px",
                  color: "white",
                }}
                onClick={toPage2}
              >
                {" "}
                To Saved
              </button>
            </h3>
            <div className="outer-card">
              <img src={frame1} alt="Pizza" />
            </div>
            <div className="outer-card">
              <img src={frame2} alt="Pizza" />
            </div>
            <div className="outer-card">
              <img src={frame3} alt="Pizza" />
            </div>
          </div>
          <hr className="line-save" />
        </div>
      </div>
    </>
  );
}

export default Home;
