import NavigationBar from "./NavigationBar";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const Account = () => {
  const [favItems, setFavItems] = useState([]);
  const navigate = useNavigate();
  const fetchFavData = async () => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection("favourites").get();
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavItems(items);
    } catch (error) {
      console.log("Error fetching cart items:", error.message);
    }
  };

  useEffect(() => {
    fetchFavData();
  }, []);

  const toFavourites = () => {
    navigate("/favourite");
  };

  const renderFavItems = () => {
    return favItems.map((item) => (
      <Col key={item.id} md={4} className="mb-5">
        <Card style={{ width: "300px", height: "350px", marginTop: "30px" }}>
          <Card.Img variant="top" src={item.image} />
          <Card
            className="mt-2"
            style={{
              width: "300px",
              height: "300px",
              background: "#164863",
              color: "white",
              textAlign: "center",
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "20px" }}>{item.name}</Card.Title>
            </Card.Body>
          </Card>
        </Card>
      </Col>
    ));
  };
  return (
    <>
      <NavigationBar />
      <h3
        className="mt-4 user-account"
        style={{
          textAlign: "center",
        }}
      >
        {" "}
        User Account{" "}
      </h3>
      <div className="container mt-4">
        <Card>
          <Card.Header>Account Details</Card.Header>
          <Card.Body>
            <Card.Title>Name: Kavinash</Card.Title>
            <Card.Text>Email: nash.kavin.kd@gmail.com</Card.Text>
          </Card.Body>
        </Card>

        <div className="mt-4">
          <Container className="mt-4">
            <h3 style={{ textAlign: "center" }}> Favourites </h3>
            <Card
              style={{
                padding: "10px",
                borderRadius: "15px",
              }}
            >
              <Row>{renderFavItems()}</Row>
            </Card>
            <Button className="mt-2 mb-2" onClick={toFavourites}>
              {" "}
              To Favourites{" "}
            </Button>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Account;
