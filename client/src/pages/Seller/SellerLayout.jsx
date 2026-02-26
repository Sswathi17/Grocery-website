import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();
  const location = useLocation();

  // Ref to the scrollable content div
  const scrollRef = useRef(null);

  // Scroll to top whenever route changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  // Sidebar links with relative paths
  const sidebarLinks = [
    { name: "Add Product", path: "", icon: assets.add_icon }, // index route
    { name: "ProductList", path: "product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data?.success) {
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="cursor-pointer w-34 md:w-38"
          />
        </Link>

        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={() => navigate("/")}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex min-h-[90vh]">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === ""} // highlight index route
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 border-r-4 md:border-r-[6px]
                ${
                  isActive
                    ? "bg-primary/10 border-primary text-primary-dull"
                    : "border-white hover:bg-gray-100/90"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-7 h-7" />
              <p className="md:block hidden">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Page Content */}
        <div
          className="flex-1 p-4 h-[95vh] overflow-y-scroll flex flex-col"
          ref={scrollRef}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
