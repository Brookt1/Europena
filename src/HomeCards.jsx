import propTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

function HomeCards({ className, image, name, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl cursor-pointer group ${className}`}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
    >
      {/* Image Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Category Image */}
      <motion.img
        className={`w-full h-full object-cover object-center transition-all duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={image}
        alt={name}
        onLoad={() => setImageLoaded(true)}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      />

      {/* Category Name */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.h3
          className="text-white font-bold text-lg md:text-xl mb-2 group-hover:text-primary-400 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {name}
        </motion.h3>
        
        <motion.div
          className="h-1 bg-primary-500 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          whileHover={{ scaleX: 1.2 }}
        />
        
        <motion.p
          className="text-gray-200 text-sm mt-2 group-hover:text-white transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Explore Collection
        </motion.p>
      </motion.div>

      {/* Hover Arrow Icon */}
      <motion.div
        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

HomeCards.propTypes = {
  className: propTypes.string,
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  onClick: propTypes.func,
};

HomeCards.defaultProps = {
  className: '',
  onClick: () => {},
};

export default HomeCards;