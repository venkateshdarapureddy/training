// components/Home.js
import {  Link } from 'react-router-dom';

function Home() {
  return (
    <div>
    <div>
      <h1 className="text-center text-3xl font-bold">Welcome to the Store</h1>
      <p className="text-center text-xl">Browse products and manage your cart.</p>
      <Link to="/products" className="block text-center mt-4 text-blue-500">
        Go to Products
      </Link>
    </div>
    </div>
  );
}

export default Home;
