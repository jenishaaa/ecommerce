import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const onSubmit = (data) => {
    console.log("Order submitted:", data);
    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation", { state: { name: data.name } });
    }, 1500);
  };

  if (!user) return null;

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty.</h1>
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: "Full name is required" })}
          placeholder="Full Name"
          className="border p-2 w-full rounded"
        />
        {errors.name && (
          <p className="text-red-600">{errors.name.message}</p>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="Email"
          className="border p-2 w-full rounded"
        />
        {errors.email && (
          <p className="text-red-600">{errors.email.message}</p>
        )}

        <textarea
          {...register("address", { required: "Shipping address is required" })}
          placeholder="Shipping Address"
          className="border p-2 w-full rounded"
        />
        {errors.address && (
          <p className="text-red-600">{errors.address.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </section>
  );
}

export default Checkout;
