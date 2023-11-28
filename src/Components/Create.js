import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import { Modal, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ingredients, setIngredients] = useState([
    { id: 1, ingredient: "", measurement: "" },
  ]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const navigate = useNavigate();

  const addRow = () => {
    if (ingredients.length < 15) {
      const newRow = {
        id: ingredients.length + 1,
        ingredient: "",
        measurement: "",
      };
      setIngredients([...ingredients, newRow]);
    }
  };

  const handleIngredientChange = (id, value, field) => {
    const updatedIngredients = ingredients.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setIngredients(updatedIngredients);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = (e) => {
    setShowModal(false);
    setShowSuccessAlert(true);

    setTimeout(() => {
      navigate("/recipe");
    }, 2000);
  };

  return (
    <>
      <NavigationBar />
      <h1
        className="my-4"
        style={{
          textAlign: "center",
          textDecoration: "underline",
          fontSize: "60px",
        }}
      >
        Create and Publish a Meal!
      </h1>
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="idMeal">Meal ID</label>
                <input type="text" className="form-control" id="idMeal" />
              </div>

              <div className="form-group">
                <label htmlFor="idMeal">Meal Name</label>
                <input type="text" className="form-control" id="mealName" />
              </div>

              <div className="form-group">
                <label htmlFor="idMeal">Category</label>
                <input type="text" className="form-control" id="mealCategory" />
              </div>

              <div className="form-group">
                <label htmlFor="idMeal">Location</label>
                <input type="text" className="form-control" id="mealLocation" />
              </div>

              <div className="form-group">
                <label htmlFor="idMeal">Instruction</label>
                <input
                  type="text"
                  className="form-control"
                  id="mealInstruction"
                />
              </div>

              <div className="form-group">
                <label htmlFor="idMeal">Meal Tags</label>
                <input type="text" className="form-control" id="mealTags" />
              </div>

              <div className="form-group">
                <label htmlFor="idMeal">YouTube Link</label>
                <input type="text" className="form-control" id="mealLink" />
              </div>

              <div className="form-group">
                <label htmlFor="idMeal">Meal Source Link</label>
                <input
                  type="text"
                  className="form-control"
                  id="mealSourceLink"
                />
              </div>

              <div className="form-group">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Measurement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={row.ingredient}
                            onChange={(e) =>
                              handleIngredientChange(
                                row.id,
                                e.target.value,
                                "ingredient"
                              )
                            }
                            placeholder="Ingredient"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={row.measurement}
                            onChange={(e) =>
                              handleIngredientChange(
                                row.id,
                                e.target.value,
                                "measurement"
                              )
                            }
                            placeholder="Measurement (g/kg)"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addRow}
                >
                  Add Row
                </button>
                <button
                  type="submit"
                  className="btn btn-primary mt-2 mb-2"
                  style={{ float: "right" }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          {showSuccessAlert && (
            <Alert variant="success" className="mt-3">
              Meal created successfully! Redirecting to Recipe page...
            </Alert>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "30px", textAlign: "center" }}>
            Confirm Creation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirmation to create this meal?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Create;
