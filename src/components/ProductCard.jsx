import { Link } from 'react-router-dom';

function ProductCard({ id, title, price, image }) {
  return (
    <Link
      to={`/products/${id}`}
      className="block border rounded-lg hover:shadow-lg transition duration-300 bg-white"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-contain p-4"
      />
      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-blue-600 font-bold">${price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
