import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  // FRONTEND ONLY STATES
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [products, setProducts] = useState(dummyProducts);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [address, setAddress] = useState(null);

  // ✅ Persist seller login on refresh
  useEffect(() => {
    const sellerToken = localStorage.getItem("sellerToken");
    if (sellerToken) {
      setIsSeller(true);
    }
  }, []);

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.success("Added to cart");
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const copy = { ...prev };
      copy[itemId] > 1 ? copy[itemId]-- : delete copy[itemId];
      return copy;
    });
  };

  // Cart count
  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  // Cart total
  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        total += product.offerPrice * cartItems[id];
      }
    }
    return total;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        setProducts,
        currency,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartCount,
        getCartAmount,
        searchQuery,
        setSearchQuery,
        navigate,
        address,
        setAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
