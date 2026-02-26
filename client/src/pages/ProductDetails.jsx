import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { assets } from "../assets/assets";

const ProductDetails = () => {
  const { products, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find(
    (p) => String(p._id) === String(id)
  );

  useEffect(() => {
    if (product?.image) {
      if (Array.isArray(product.image)) {
        setThumbnail(product.image[0]);
      } else {
        setThumbnail(product.image);
      }
    } else {
      setThumbnail(assets.placeholder_image);
    }
  }, [product]);

  useEffect(() => {
    if (product && products.length > 0) {
      const filtered = products.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [product, products]);

  if (!product)
    return (
      <p className="text-center mt-20 text-lg">Loading product...</p>
    );

  return (
    <div className="mt-12 px-6 max-w-6xl mx-auto">
      <nav className="text-sm mb-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/products" className="hover:underline">
          Products
        </Link>{" "}
        /{" "}
        <span className="text-primary font-medium">
          {product.name}
        </span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {Array.isArray(product.image) &&
              product.image.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setThumbnail(img)}
                  className={`border rounded cursor-pointer w-20 h-20
                    ${
                      thumbnail === img
                        ? "border-primary"
                        : "border-gray-300"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>

          {/* ✅ FIXED HERE */}
          <div className="border border-gray-300 rounded w-400px h-400px flex items-center justify-center">
            <img
              src={thumbnail || assets.placeholder_image}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={
                    i < product.rating
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  alt=""
                  className="w-4"
                />
              ))}
            <p className="ml-2">(4)</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-400 line-through">
              {currency} {product.price}
            </p>
            <p className="text-2xl font-semibold">
              {currency} {product.offerPrice}
            </p>
            <span className="text-gray-400">
              (inclusive of all taxes)
            </span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-5 mt-2 text-gray-500">
            {product.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3 bg-primary text-white"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-medium text-center">
            Related Products
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {relatedProducts.map((item, idx) => (
              <ProductCard key={idx} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
