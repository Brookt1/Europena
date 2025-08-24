
import propTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './components/Button';

function ItemCard({ image, name, price, onAddToCart, onQuickView, isWishlisted, onToggleWishlist }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ image, name, price });
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView({ image, name, price });
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist({ image, name, price });
    }
  };

  return (
    <motion.div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gray-100 rounded-t-2xl overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
          </div>
        )}
        
        <motion.img
          src={image}
          alt={name}
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        />

        {/* Wishlist Button */}
        <motion.button
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted 
              ? 'bg-red-500 text-white shadow-md' 
              : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
          onClick={handleToggleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>

        {/* Quick Actions Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <Button
              variant="secondary"
              size="small"
              onClick={handleQuickView}
              className="!bg-white/90 !text-gray-800 !border-none hover:!bg-white"
            >
              Quick View
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3 
          className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2"
          animate={{ color: isHovered ? '#059669' : '#111827' }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.h3>
        
        <div className="flex items-center justify-between mb-4">
          <motion.p 
            className="text-xl font-bold text-primary-600"
            whileHover={{ scale: 1.05 }}
          >
            {price} ETB
          </motion.p>
          
          {/* Rating Stars (placeholder) */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.2 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
            <span className="text-sm text-gray-500 ml-1">(4.5)</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          size="medium"
          className="w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>

      {/* Sale Badge (if needed) */}
      <motion.div
        className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
        initial={{ opacity: 0, scale: 0, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -12 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
        style={{ display: 'none' }} // Show conditionally based on sale status
      >
        SALE
      </motion.div>
    </motion.div>
  );
}

ItemCard.propTypes = {
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  onAddToCart: propTypes.func,
  onQuickView: propTypes.func,
  isWishlisted: propTypes.bool,
  onToggleWishlist: propTypes.func,
};

ItemCard.defaultProps = {
  onAddToCart: null,
  onQuickView: null,
  isWishlisted: false,
  onToggleWishlist: null,
};

export default ItemCard;