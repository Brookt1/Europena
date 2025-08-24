import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Standardized Button component with consistent styling, variants, and smooth animations
 * 
 * @param {string} variant - Button style variant: 'primary', 'secondary', 'ghost', 'danger', 'outline', 'success'
 * @param {string} size - Button size: 'small', 'medium', 'large'
 * @param {boolean} loading - Shows loading state
 * @param {boolean} disabled - Disables the button
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  loading = false,
  disabled = false,
  ...props
}, ref) => {
  const baseStyles = "font-medium rounded-lg transition-all duration-300 focus:ring-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center relative overflow-hidden";
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-100 shadow-md hover:shadow-lg",
    secondary: "bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-100 shadow-md hover:shadow-lg",
    ghost: "text-primary-500 hover:bg-primary-50 focus:ring-primary-100 hover:shadow-md",
    danger: "bg-error text-white hover:bg-red-600 focus:ring-red-100 shadow-md hover:shadow-lg",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500 focus:ring-primary-100 hover:shadow-md",
    success: "bg-success text-white hover:bg-green-600 focus:ring-green-100 shadow-md hover:shadow-lg"
  };
  
  const sizes = {
    small: "px-3 py-2 text-sm min-h-[36px]",
    medium: "px-6 py-3 text-base min-h-[44px]",
    large: "px-8 py-4 text-lg min-h-[52px]"
  };
  
  const LoadingSpinner = () => (
    <motion.svg 
      className="-ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  );
  
  return (
    <motion.button 
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {loading && <LoadingSpinner />}
      <motion.span
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger', 'outline', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;