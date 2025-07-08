import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyStore
        </Link>

        <div className="flex gap-4 items-center">
          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>

          {user && user.email ? (
            <>
              <span className="text-gray-700">
                {user.name ? `Hi, ${user.name}` : user.email}
              </span>
              <button
                onClick={logout}
                className="hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-600">
                Sign Up
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-blue-600 relative"
          >
            <FaShoppingCart />
            Cart
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-2 text-xs">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
