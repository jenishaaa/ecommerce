import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const {
    cartItems,
    removeItem,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty.</h1>
        <Link
          to="/products"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 items-center border-b py-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-24 h-24 object-contain"
          />
          <div className="flex-1">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-blue-600 font-bold">${item.price}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear Cart
        </button>
        <div className="text-lg font-bold">
          Total: ${total.toFixed(2)}
        </div>
      </div>
      <div className="text-right mt-4">
        <Link
          to="/checkout"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}

export default Cart;
