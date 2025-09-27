import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { user, login } = useContext(AuthContext);
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
      const res = await api.post("/auth/login", { email, password });
      toast.success("Login successful!");
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Login failed. Invalid username/password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
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
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="mt-4 text-center text-sm">
              Need to register?{" "}
              <Link to="/register" className="link link-primary">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
