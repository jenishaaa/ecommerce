import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.email) {
      alert('Please fill out all fields.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      navigate('/order-confirmation', { state: { name: form.name } });
    }, 1500);
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Order Placed.</h1>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </section>
  );
}

export default Checkout;
