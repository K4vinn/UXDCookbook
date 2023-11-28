import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import NavigationBar from "./NavigationBar";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";

const RecipeInfo = () => {
  const [recipe, setRecipe] = useState(null);
  const [showAlertSuccess, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Parse the meal ID from the URL
        const mealIdFromUrl = window.location.pathname.split("/").pop();

        const db = firebase.firestore();
        const recipeDoc = await db.collection("meals").doc(mealIdFromUrl).get();

        if (recipeDoc.exists) {
          setRecipe({
            id: recipeDoc.id,
            ...recipeDoc.data(),
          });
        } else {
          // Handle case where the recipe does not exist
          console.error("Recipe not found for ID:", mealIdFromUrl);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const renderIngredientsTable = () => {
    const rows = [];
    for (let i = 1; i <= 15; i++) {
      const measureKey = `strMeasure${i}`;
      const ingredientKey = `strIngredient${i}`;
      const measure = recipe[measureKey];
      const ingredient = recipe[ingredientKey];

      // Check if both measure and ingredient exist before rendering
      if (measure && ingredient) {
        rows.push(
          <tr key={i}>
            <td>{measure}</td>
            <td>{ingredient}</td>
          </tr>
        );
      }
    }
    return rows;
  };

  const addToFav = () => {
    setShowSuccessAlert(true);

    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 2000);
  };

  return (
    <>
      <NavigationBar />
      <h1
        className="mt-3"
        style={{
          textAlign: "center",
          textDecoration: "underline",
          fontSize: "60px",
        }}
      >
        Recipe Information
      </h1>
      {showAlertSuccess && (
        <Alert variant="success" className="mt-3 d-flex justify-content-center">
          Added to Favourite
        </Alert>
      )}
      <div className="container mt-3">
        <div
          className="card"
          style={{ backgroundColor: "#213555", color: "white" }}
        >
          <Button
            className="primary-btn"
            style={{
              fontSize: "30px",
              width: "300px",
              height: "80px",
              textAlign: "center",
              margin: "12px auto",
              marginBottom: "-12px",
              background: "lightBlue",
              color: "#213555",
            }}
            onClick={addToFav}
          >
            Add To Favourite
          </Button>
          <img
            src={recipe.strMealThumb}
            className="card-img-top  mt-3"
            alt={recipe.strMeal}
            style={{
              width: "500px",
              height: "500px",
              justifyContent: "center",
              margin: "0 auto",
              borderRadius: "15px",
            }}
          />

          <div className="card-body">
            <h2
              className="card-title"
              style={{
                textAlign: "center",
                fontSize: "30px",
                textDecoration: "underline",
              }}
            >
              {recipe.strMeal}
            </h2>
            <p className="card-text">
              <strong>Category:</strong> {recipe.strCategory}
            </p>
            <p className="card-text">
              <strong>Area:</strong> {recipe.strArea}
            </p>
            <p className="card-text">
              <strong>Tags:</strong> {recipe.strTags}
            </p>
            <h4 className="mt-4" style={{ textDecoration: "underline" }}>
              Ingredients
            </h4>
            <table className="table table-striped" style={{ color: "black" }}>
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Ingredient</th>
                </tr>
              </thead>
              <tbody>{renderIngredientsTable()}</tbody>
            </table>
            <h4 className="mt-4" style={{ textDecoration: "underline" }}>
              Instructions
            </h4>
            <p className="card-text">{recipe.strInstructions}</p>
            <a
              href={recipe.strYoutube}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Video
            </a>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h2 className="mb-3">Comments and Reviews</h2>
        {/* Add a form for adding comments/reviews */}
        <form>
          <div className="form-group">
            <label htmlFor="comment">Leave a Comment or Review:</label>
            <textarea className="form-control" id="comment" rows="3"></textarea>
          </div>
          <button type="submit" className="btn mt-2 btn-primary">
            Submit
          </button>
        </form>

        <hr />

        {/* Display existing comments/reviews (if any) */}
        <div className="mt-4">
          <h4>Existing Comments/Reviews:</h4>
          {/* You can dynamically render existing comments/reviews here */}
          <div className="card bg-light mb-4">
            <div
              className="card-body"
              style={{
                height: "210px",
              }}
            >
              <p style={{ marginBottom: "-2px" }}> K4vinn </p>
              <p>
                Great recipe! Easy to do and took me just a few minutes to
                prepare ingredients!
              </p>
              <br />
              <p style={{ float: "right", fontSize: "20px" }}>
                {" "}
                23 November 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;
