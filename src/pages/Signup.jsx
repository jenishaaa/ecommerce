import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signing up:", data);
    // Here you would call your backend to create user
    login({ name: data.name, email: data.email });
    navigate("/");
  };

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Full Name"
          className="border p-2 w-full rounded"
        />
        {errors.name && (
          <p className="text-red-600">{errors.name.message}</p>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
          })}
          placeholder="Email"
          className="border p-2 w-full rounded"
        />
        {errors.email && (
          <p className="text-red-600">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          className="border p-2 w-full rounded"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;
