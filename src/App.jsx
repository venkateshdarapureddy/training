// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import './App.css';

function Home() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Welcome to the Store</h1>
      <p className="text-center text-xl">Browse products and manage your cart.</p>
      <Link to="/products" className="block text-center mt-4 text-blue-500">
        Go to Products
      </Link>
    </div>
  );
}

function Products({ addItemstoCart }) {
  const [product, setProduct] = useState([]);

  const fetchdata = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setProduct(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-4 p-4">
      {product.map((products) => (
        <div key={products.id} className="bg-gray-500 text-white p-4 rounded-lg w-1/4">
          <div className="flex flex-col items-center">
            <img src={products.thumbnail} alt={products.title} className="h-40 w-full object-cover mb-2" />
            <h3 className="text-lg">{products.title}</h3>
            <p>Price: ${products.price}</p>
            <div className="flex gap-4 mt-2">
              <button
                className="bg-blue-500 px-4 py-2 rounded text-white"
                onClick={() => addItemstoCart(products.id, products.price, products.title)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Cart({ cart }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        cart.map((cartItem) => (
          <div key={cartItem.cartId} className="border-b py-2">
            <p>{cartItem.name} - ${cartItem.price} x {cartItem.quantity}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  function addItemstoCart(id, price, title) {
    const existing = cart.find((cartItem) => cartItem.productId === id);
    if (existing) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.productId === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      const cartItem = {
        cartId: 'cart' + nanoid(),
        productId: id,
        name: title,
        price: price,
        quantity: 1,
      };
      setCart([...cart, cartItem]);
    }
  }

  return (
    <Router>
      <nav className="bg-gray-700 text-white p-4">
        <ul className="flex justify-around">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addItemstoCart={addItemstoCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
