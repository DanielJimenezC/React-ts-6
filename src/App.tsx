import React, { useEffect, useReducer } from 'react';
import './App.css';
import cartReducer from './cartReducer';
import Header from "./Header";
import { Route, Routes } from 'react-router-dom';
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Footer from './Footer';

let initialCart: any[];
try {
  var cart = localStorage.getItem("cart")
  if (cart != null)
    initialCart = JSON.parse(cart);
  else 
    initialCart = [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    <>
    <div className="content">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
          <Route path="/:category" element={<Products/>} />
          <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            />
        </Routes>
      </main>
    </div>
    <Footer />
    </>
  );
}
