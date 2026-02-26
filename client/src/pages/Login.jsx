// Correct imports
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext"; // ✅ only once
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios } = useAppContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(""); // ✅ separate state
  const [email, setEmail] = useState(""); // ✅ separate state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`/api/user/${state}`, { name, email, password });
      if (response.data.success) {
        Navigate("/");
        setUser(response.data.user);
        setShowUserLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email });
      setShowUserLogin(false);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      setUser({ email });
      setShowUserLogin(false);
    }
  };

  const handleGoogleLogin = () => {
    setUser({ email: "user@gmail.com" });
    setShowUserLogin(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 p-6 relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {isSignUp
            ? "Create your account to get started"
            : "Welcome back! Please sign in to continue"}
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 text-gray-700 hover:bg-gray-100 transition mb-4"
        >
          Continue with Google
        </button>

        <form
          className="flex flex-col gap-4"
          onSubmit={isSignUp ? handleSignUp : handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull text-white py-2 rounded-full transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setShowUserLogin(false)}
        >
          ✕
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <a
            href="#"
            style={{ color: "var(--color-primary)" }}
            className="hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
