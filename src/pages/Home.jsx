import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setFeaturedProducts(selected);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main>
      <Hero />

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>

        {loading && <p className="text-center">Loading featured products...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid gap-8 md:grid-cols-3">
          {!loading && !error && featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-56 w-full object-contain p-4"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-blue-600 font-bold mb-4">${product.price}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-blue-600 text-white py-12 px-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">Ready to explore more?</h2>
        <p className="mb-6">Browse all our categories and find what suits you best.</p>
        <Link
          to="/products"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-100 transition"
        >
          Browse Products
        </Link>
      </section>
    </main>
  );
}

export default Home;
