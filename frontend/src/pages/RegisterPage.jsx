import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const { user, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // redirect if already logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      toast.success("Registration successful!");

      // optionally auto-login right after register
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Registration failed. Invalid input."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full mb-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
