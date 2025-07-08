import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    // Filter by category
    if (category !== 'all') {
      updated = updated.filter(p => p.category === category);
    }

    // Filter by search
    if (searchTerm.trim() !== '') {
      updated = updated.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice !== '') {
      updated = updated.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      updated = updated.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Sort
    if (sortOrder === 'lowToHigh') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      updated.sort((a, b) => b.price - a.price);
    }

    setFiltered(updated);
  }, [searchTerm, category, sortOrder, minPrice, maxPrice, products]);

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-center">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-5xl mx-auto">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="all">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-5xl mx-auto">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
