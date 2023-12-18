import React, { useState } from 'react';
import './App.css';

const Product = ({ product, onAddToCart, onRemoveFromCart }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100">
        <img className="card-img-top" src={product.image} alt={product.name} />
        <div className="card-body">
          <h4 className="card-title">{product.name}</h4>
          <p className="card-text">{product.description}</p>
        </div>
        <div className="card-footer">
          {product.inCart ? (
            <button className="btn btn-danger" onClick={() => onRemoveFromCart(product)}>
              Remove from Cart
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Cart = ({ cart, onRemoveFromCart }) => {
  return (
    <div className="col-lg-4">
      <h2>Shopping Cart</h2>
      <ul className="list-group">
        {cart.map((item) => (
          <li className="list-group-item" key={item.id}>
            {item.name}{' '}
            <button className="btn btn-danger btn-sm" onClick={() => onRemoveFromCart(item)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description 1', image: 'image1.jpg', inCart: false },
    { id: 2, name: 'Product 2', description: 'Description 2', image: 'image2.jpg', inCart: false },
    // Add more products as needed
  ]);

  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, inCart: true } : p
    );
    setProducts(updatedProducts);
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, inCart: false } : p
    );
    setProducts(updatedProducts);
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
        <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
      </div>
    </div>
  );
};

export default App;
