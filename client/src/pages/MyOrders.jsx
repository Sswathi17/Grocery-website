import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency = "₹" } = useAppContext(); // fallback in case currency is undefined

  // Load dummy orders (frontend-only)
  const fetchMyOrders = async () => {
    if (dummyOrders && dummyOrders.length > 0) {
      setMyOrders(dummyOrders);
    } else {
      setMyOrders([]); // fallback empty array
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mt-16 pb-16 max-w-6xl mx-auto px-4">
      {/* Heading */}
      <div className="flex flex-col items-start mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Orders list */}
      {myOrders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders found</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg mb-10 p-4 py-5"
          >
            {/* Order Info */}
            <p className="flex justify-between text-gray-400 md:font-medium max-md:flex-col gap-1 mb-4">
              <span>Order ID: {order._id || "N/A"}</span>
              <span>Payment: {order.paymentType || "N/A"}</span>
              <span>
                Total Amount: {currency}
                {order.amount || 0}
              </span>
            </p>

            {/* Order Items */}
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className={`relative bg-white text-gray-500/70 ${
                  order.items.length !== idx + 1 ? "border-b" : ""
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 md:gap-16 w-full max-w-4xl`}
              >
                {/* Left side */}
                <div className="flex items-start">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <img
                      src={item.product?.image || "/placeholder.png"} // ✅ fixed
                      alt={item.product?.name || "Product"} // ✅ fixed
                      className="w-16 h-16 object-cover"
                    />
                  </div>

                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-800">
                      {item.product?.name || "Product Name"}
                    </h2>
                    <p>Category: {item.product?.category || "Category"}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Status: {order.status || "Pending"}</p>
                    <p>
                      Date:{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <p className="text-primary text-lg font-medium mt-4 md:mt-0">
                  Amount: {currency}
                  {(item.product?.offerPrice || 0) * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
