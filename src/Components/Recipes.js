import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Button, Dropdown } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import NavigationBar from "./NavigationBar";
import "../Style/Recipes.css";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage, setMealsPerPage] = useState(calculateMealsPerPage());
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchMeals = async () => {
      const db = firebase.firestore();
      const mealsCollection = db.collection("meals");
      const snapshot = await mealsCollection.get();

      const mealData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMeals(mealData);
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setMealsPerPage(calculateMealsPerPage());
      setCurrentPage(1); // Reset to the first page when the screen size changes
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get current meals based on pagination and category filter
  const filteredMeals = meals.filter(
    (meal) =>
      selectedCategory === "All" || meal.strCategory === selectedCategory
  );
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  function calculateMealsPerPage() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      return 8; // Adjust the number of meals per page for large screens
    } else if (screenWidth >= 768) {
      return 6; // Adjust the number of meals per page for medium screens
    } else {
      return 4; // Adjust the number of meals per page for small screens
    }
  }

  return (
    <>
      <NavigationBar />
      <Container>
        <h1
          className="my-4"
          style={{
            textAlign: "center",
            textDecoration: "underline",
            fontSize: "60px",
          }}
        >
          Recipes
        </h1>
        <Row>
          <Col xs={12}>
            <Dropdown className="mb-2">
              <Dropdown.Toggle
                style={{ backgroundColor: "#213555", borderColor: "#9BBEC8" }}
                className="custom-dropdown"
                id="dropdown-basic"
              >
                Category: {selectedCategory}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategoryChange("All")}>
                  All
                </Dropdown.Item>

                {Array.from(new Set(meals.map((meal) => meal.strCategory))).map(
                  (category, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Dropdown.Item>
                  )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          {currentMeals.map((meal, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/recipe/${meal.id}`}>
                <Card
                  className="mb-4"
                  style={{ width: "300px", height: "450px" }}
                >
                  <Card.Img
                    variant="top"
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{ fontSize: "23px", textAlign: "center" }}
                    >
                      {meal.strMeal}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center mt-4 mb-2">
          <Button
            variant="secondary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="mx-3 mt-2">Page {currentPage}</div>
          <Button
            variant="secondary"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastMeal >= filteredMeals.length}
          >
            Next
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Recipes;
