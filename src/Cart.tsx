import React from "react";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function Cart({cart, dispatch} : { cart: any , dispatch: any }) {
    const navigate = useNavigate();
    const urls = cart.map((i: any) => `products/${i.id}`);
    const { data: products, loading, error } = useFetchAll(urls);
  
    function renderItem(itemInCart: any) {
      const { id, sku, quantity } = itemInCart;
      const { price, name, image, skus } = products.find(
        (p: any) => p.id === parseInt(id)
      );
      const { size } = skus.find((s: any) => s.sku === sku);
  
      return (
        <li key={sku} className="cart-item">
          <img src={`/images/${image}`} alt={name} />
          <div>
            <h3>{name}</h3>
            <p>${price}</p>
            <p>Size: {size}</p>
            <p>
              <select
                aria-label={`Select quantity for ${name} size ${size}`}
                onChange={(e) =>
                  dispatch({
                    type: "updateQuantity",
                    sku,
                    quantity: parseInt(e.target.value),
                  })
                }
                value={quantity}
              >
                <option value="0">Remove</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </p>
          </div>
        </li>
      );
    }
  
    if (loading) return <Spinner />;
    if (error) throw error;
  
    const numItemsInCart = cart.reduce((total: any, item: any) => total + item.quantity, 0);
  
    return (
      <section id="cart">
        <h1>
          {numItemsInCart === 0
            ? "Your cart is empty"
            : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
        </h1>
        <ul>{cart.map(renderItem)}</ul>
        {cart.length > 0 && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        )}
      </section>
    );
  }