import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-center">No product found.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-blue-600 mb-4">${product.price}</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
