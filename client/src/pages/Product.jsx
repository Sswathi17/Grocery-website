import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Product = () => {
  const { category, id } = useParams();
  const { products, currency, addToCart } = useAppContext();

  const product = products.find((item) => item._id === id);

  if (!product) {
    return <p className="mt-10 text-center">Product not found</p>;
  }

  return (
    <div className="mt-10 grid md:grid-cols-2 gap-10">
      <div className="flex justify-center">
        <img
          src={product.image?.[0]}
          alt={product.name}
          className="w-72"
        />
      </div>

      <div>
        <p className="text-sm text-gray-500 capitalize">{category}</p>

        <h1 className="text-2xl font-semibold mt-2">
          {product.name}
        </h1>

        <p className="text-xl text-primary font-medium mt-3">
          {currency}${product.offerPrice}
          <span className="text-sm text-gray-400 line-through ml-2">
            {currency}${product.price}
          </span>
        </p>

        <button
          onClick={() => addToCart(product._id)}
          className="mt-6 px-6 py-2 bg-primary text-white rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
