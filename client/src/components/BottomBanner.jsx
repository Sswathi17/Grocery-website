import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      
      {/* Desktop Image */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />

      {/* Mobile Image */}
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full block md:hidden"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-12 md:pt-0 md:pr-24 text-center md:text-right">
        
        <h1 className="text-2xl md:text-4xl font-bold mb-6">
          Why We Are the Best?
        </h1>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-9 md:w-11"
              />

              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default BottomBanner
