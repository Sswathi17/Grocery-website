import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check on mount if already logged in
  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (token) {
      setIsSeller(true);
      navigate("/seller");
    }
  }, [setIsSeller, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // ✅ Frontend-only mock login
      // Only this email/password will work
      if (email === "seller@test.com" && password === "123456") {
        localStorage.setItem("sellerToken", "mock-jwt-token"); // simulate token
        setIsSeller(true);
        toast.success("Login successful!");
        navigate("/seller"); // redirect to seller dashboard
      } else {
        toast.error("Login failed! Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 rounded-lg shadow-xl border">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> Login
          </p>

          <div className="w-full">
            <p>Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="seller@test.com"
              className="border rounded w-full p-2 mt-1"
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="123456"
              className="border rounded w-full p-2 mt-1"
            />
          </div>

          <button className="bg-primary text-white w-full p-2 rounded">
            Login
          </button>

          <p className="text-gray-500 text-sm mt-2">
            Use <b>seller@test.com</b> / <b>123456</b> to login
          </p>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
