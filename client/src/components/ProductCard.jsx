import React from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductCard = ({ product = {} }) => {
  const navigate = useNavigate();
  const { currency = "₹", addToCart, removeFromCart, cartItems = {} } =
    useAppContext();

  const id = product._id;
  const name = product.name || "Unnamed Product";
  const category = product.category || "Uncategorized";
  const price = product.offerPrice || 0;

  const imageUrl = Array.isArray(product.image)
    ? product.image[0]
    : product.image;

  const inCart = cartItems[id] || 0;

  const goToProduct = () => {
    navigate(`/products/${category.toLowerCase()}/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={goToProduct}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full cursor-pointer"
    >
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-36 h-36 object-cover hover:scale-105 transition-transform rounded"
        />
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <p>{category}</p>
        <p className="font-medium text-lg truncate">{name}</p>

        <div className="flex items-center gap-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-3"
              />
            ))}
          <span>(4)</span>
        </div>

        <div className="flex justify-between items-end mt-3">
          <p className="text-primary font-semibold">
            {currency}
            {price}
          </p>

          <div onClick={(e) => e.stopPropagation()}>
            {inCart === 0 ? (
              <button
                onClick={() => addToCart(id)}
                className="bg-primary/10 border border-primary/40 px-3 py-1 rounded"
              >
                Add
              </button>
            ) : (
              <div className="flex gap-2 items-center bg-primary/20 px-2 rounded">
                <button onClick={() => removeFromCart(id)}>-</button>
                <span>{inCart}</span>
                <button onClick={() => addToCart(id)}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
