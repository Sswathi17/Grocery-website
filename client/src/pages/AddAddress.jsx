import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

// Reusable Input
const InputField = ({ name, type, placeholder, value, onChange }) => (
  <input
    className="w-full px-3 py-2.5 border border-gray-400/40 rounded outline-none focus:border-primary"
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
  />
);

const AddAddress = () => {
  const { user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/cart");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
  e.preventDefault();

  // 🔹 STEP 1: already saved addresses eduthuko
  const oldAddresses =
    JSON.parse(localStorage.getItem("addresses")) || [];

  // 🔹 STEP 2: new address add pannu
  const updatedAddresses = [...oldAddresses, address];

  // 🔹 STEP 3: localStorage-la save pannu
  localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

  toast.success("Address saved successfully ✅");
  navigate("/cart");
};


  return (
    <div className="mt-16 pb-16 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl text-gray-600">
        Add Shipping <span className="text-primary font-semibold">Address</span>
      </h1>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10 gap-10">
        {/* FORM */}
        <form
          onSubmit={submitHandler}
          className="flex-1 max-w-md space-y-4 text-sm"
        >
          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="firstName"
              type="text"
              placeholder="First Name"
              value={address.firstName}
              onChange={handleChange}
            />
            <InputField
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={address.lastName}
              onChange={handleChange}
            />
          </div>

          <InputField
            name="email"
            type="email"
            placeholder="Email"
            value={address.email}
            onChange={handleChange}
          />

          <InputField
            name="street"
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="city"
              type="text"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
            />
            <InputField
              name="state"
              type="text"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="zipcode"
              type="text"
              placeholder="Zipcode"
              value={address.zipcode}
              onChange={handleChange}
            />
            <InputField
              name="country"
              type="text"
              placeholder="Country"
              value={address.country}
              onChange={handleChange}
            />
          </div>

          <InputField
            name="phone"
            type="text"
            placeholder="Phone"
            value={address.phone}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 mt-4 hover:bg-primary-dull"
          >
            Save Address
          </button>
        </form>

        {/* IMAGE */}
        <img
          src={assets.add_address_iamge}
          alt="add address"
          className="w-80 mx-auto md:mx-0"
        />
      </div>
    </div>
  );
};

export default AddAddress;
