import React from 'react';

const ShimmerLoader = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-lg"></div>
    </div>
  );
};

// Hero section shimmer
export const HeroShimmer = () => {
  return (
    <div className="home-page pt-4">
      <section className="relative flex flex-col md:flex-row items-center justify-center pt-[120px] px-4 md:px-[200px] h-screen w-[95%] mx-auto bg-gradient-to-br from-gray-50 to-white z-0 rounded-2xl overflow-hidden shadow-lg">
        {/* Text Container Shimmer */}
        <div className="landingText text-center mx-auto md:text-left md:pr-8 space-y-6 animate-pulse">
          <div className="h-16 bg-gray-200 rounded-lg w-full max-w-lg"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-14 bg-gray-200 rounded-lg w-48"></div>
        </div>

        {/* Image Container Shimmer */}
        <div className="relative md:ml-8 group">
          <div className="w-full max-w-[850px] h-[650px] bg-gray-200 rounded-2xl shadow-2xl animate-pulse"></div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gray-300 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-300 rounded-full opacity-60 animate-pulse"></div>
        </div>
      </section>
    </div>
  );
};

// Product card shimmer
export const ProductCardShimmer = () => {
  return (
    <div className="text-center animate-pulse">
      <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-200">
      </div>
      <div className="mt-3 h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div className="mt-6 h-12 bg-gray-200 rounded w-32 mx-auto"></div>
    </div>
  );
};

// Trending products shimmer
export const TrendingProductsShimmer = () => {
  return (
    <section className="py-16 bg-gray-50 px-6 md:px-16">
      <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <ProductCardShimmer key={index} />
        ))}
      </div>
    </section>
  );
};

export default ShimmerLoader;