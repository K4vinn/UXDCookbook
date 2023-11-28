import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Create from "./Components/Create";
import Recipes from "./Components/Recipes";
import Account from "./Components/Account";
import RecipeInfo from "./Components/RecipeInfo";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import Favourite from "./Components/Favourite";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/account" element={<Account />} />
        <Route path="/recipe" element={<Recipes />} />
        <Route path="/recipe/:mealId" element={<RecipeInfo />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </Router>
  );
}

export default App;
