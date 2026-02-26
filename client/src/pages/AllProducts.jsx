import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products = [], searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  const inStockProducts = filteredProducts.filter(
    (product) => product.inStock
  );

  return (
    <div className="mt-10 md:mt-16 flex flex-col px-3 sm:px-4 md:px-8">

      {/* Heading */}
      <div className="flex flex-col items-center md:items-end w-full md:w-max">
        <p className="text-xl sm:text-2xl md:text-2xl font-semibold uppercase text-center md:text-right">
          All Products
        </p>
        <div className="w-12 sm:w-16 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Products Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-3
          sm:gap-4
          md:gap-6
          mt-6
        "
      >
        {inStockProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* No Products Message */}
      {inStockProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6 text-sm sm:text-base">
          No products found.
        </p>
      )}
    </div>
  );
};

export default AllProducts;
