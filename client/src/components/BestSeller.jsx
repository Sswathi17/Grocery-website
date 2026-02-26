import React from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products = [] } = useAppContext();

  const bestSellers = products
    .filter(
      (product) =>
        product.inStock === true || product.inStock === "true"
    )
    .slice(0, 5);

  return (
    <div className="mt-8 sm:mt-10 md:mt-12 px-3 sm:px-4 md:px-10">
      
      {/* Heading */}
      <div className="text-center md:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase">
          Best Sellers
        </h2>
        <div className="w-16 sm:w-20 h-1 bg-primary mx-auto md:mx-0 mt-2 rounded-full"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
        {bestSellers.length > 0 ? (
          bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-sm sm:text-base">
            No best sellers available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
