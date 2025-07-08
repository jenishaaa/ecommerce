import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (data) => {
    // Normally you'd send data to backend here
    console.log("Logging in with:", data);
    login({ name: data.email.split("@")[0], email: data.email });
    navigate("/");
  };

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-2">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
