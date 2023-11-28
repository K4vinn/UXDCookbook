import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
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

  const toAccount = () => {
    navigate("/account");
  };

  const renderFavItems = () => {
    return favItems.map((item) => (
      <Col key={item.id} md={4} className="mb-5">
        <Card style={{ width: "300px", height: "450px", marginTop: "30px" }}>
          <Card.Img variant="top" src={item.image} />
          <Card
            className="mt-2"
            style={{
              width: "300px",
              height: "450px",
              background: "#164863",
              color: "white",
              textAlign: "center",
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "20px" }}>{item.name}</Card.Title>
              <Button
                variant="danger"
                style={{
                  width: "200px",
                  height: "60px",
                  textAlign: "center",
                  margin: "auto",
                  padding: "10px",
                }}
              >
                Remove
              </Button>
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
        className="mt-2"
        style={{
          textAlign: "center",
        }}
      >
        Favourites
      </h3>
      <Container className="mt-4">
        <Card
          style={{
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <Row>{renderFavItems()}</Row>
          <Button
            style={{
              float: "right",
            }}
            onClick={toAccount}
          >
            Return To Accounts
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Favourite;
