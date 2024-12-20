// components/Products.js
import { useEffect, useState } from 'react';
import useStore from './usestore';


function Products() {
  const addItemstoCart = useStore((state) => state.addItemstoCart);
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
            <button
              className="bg-blue-500 px-4 py-2 rounded text-white"
              onClick={() => addItemstoCart(products.id, products.price, products.title)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
