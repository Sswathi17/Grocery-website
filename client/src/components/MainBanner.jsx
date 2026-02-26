import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const MainBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl">

      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 md:px-16 max-w-xl text-left space-y-6">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Freshness You Can Trust,
            <br />
            Savings You Will Love!
          </h1>

          <div className="flex items-center gap-6">
            {/* Primary CTA */}
            <Link
  to="/products"
  className="group flex items-center gap-2 px-7 md:px-9 py-3 transition rounded text-white cursor-pointer"
  style={{ backgroundColor: "var(--color-primary)" }}
  onMouseOver={(e) =>
    (e.currentTarget.style.backgroundColor = "var(--color-primary-dull)")
  }
  onMouseOut={(e) =>
    (e.currentTarget.style.backgroundColor = "var(--color-primary)")
  }
>
  Shop now
</Link>


            
            


            {/* Secondary CTA */}
            <Link
              to="/products"
              className="flex items-center gap-2 text-gray-700 font-medium group"
            >
              Explore deals
              <img
                src={assets.black_arrow_icon}
                alt="arrow"
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default MainBanner;
