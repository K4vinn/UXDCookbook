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

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartData = async () => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection("cart").get();
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
    } catch (error) {
      console.log("Error fetching cart items:", error.message);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const renderCartItems = () => {
    return cartItems.map((item) => (
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
              <Card.Title>{item.name}</Card.Title>
              <Card.Text style={{ fontSize: "20px" }}>
                MYR {item.price}
              </Card.Text>
              <div>1</div>
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
        className="mt-4"
        style={{
          textAlign: "center",
        }}
      >
        Cart
      </h3>
      <Container className="mt-4">
        <Card
          style={{
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <Row>{renderCartItems()}</Row>

          <Button
            style={{
              float: "right",
            }}
          >
            Checkout
          </Button>
        </Card>
      </Container>
    </>
  );
};

export default Cart;
