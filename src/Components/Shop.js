import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Modal, Alert } from "react-bootstrap";

const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fetchShopData = async () => {
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection("shop").get();
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setShopItems(items);
    } catch (error) {
      console.error("Error fetching shop data:", error.message);
    }
  };

  useEffect(() => {
    fetchShopData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const categories = [...new Set(shopItems.map((item) => item.category))];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleToCart = () => {
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

  const filteredItems = selectedCategory
    ? shopItems.filter((item) => item.category === selectedCategory)
    : shopItems;

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <Row>
          {showSuccessModal && (
            <Alert
              variant="success"
              className="mt-3"
              style={{
                textAlign: "center",
              }}
            >
              Added Item To Cart
            </Alert>
          )}
          <Col md={3}>
            <h4>Categories</h4>
            <Card>
              <ul>
                {categories.map((category, index) => (
                  <li
                    className="mt-2"
                    key={index}
                    style={{
                      listStyleType: "none",
                      float: "left",
                      textDecoration: "none",
                      color: "black",
                      padding: "0",
                      margin: "0",
                    }}
                  >
                    <Button
                      className="button"
                      style={{ float: "right", width: "200px", height: "80px" }}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col md={9}>
            <Row>
              {filteredItems.map((item) => (
                <Col key={item.id} md={4} className="mb-5">
                  <Card
                    style={{
                      width: "300px",
                      height: "450px",
                      marginTop: "30px",
                    }}
                  >
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
                        <Card.Text
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          MYR {item.price}/{item.weight}
                        </Card.Text>
                        <Button className="primary-btn" onClick={handleToCart}>
                          Add To Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Shop;
