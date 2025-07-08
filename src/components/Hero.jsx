import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">Welcome to MyStore</h1>
      <p className="text-gray-700 mb-6 text-lg">Shop the best products at unbeatable prices.</p>
      <Link
        to="/products"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Shop Now
      </Link>
    </section>
  );
}

export default Hero;
