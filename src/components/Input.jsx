import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Standardized Input component with consistent styling, validation, accessibility, and smooth animations
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message to display
 * @param {string} helperText - Helper text to display
 * @param {string} type - Input type
 * @param {boolean} required - Whether the field is required
 * @param {boolean} disabled - Whether the input is disabled
 * @param {string} className - Additional CSS classes
 */
const Input = forwardRef(({ 
  label, 
  error, 
  helperText, 
  type = 'text',
  required = false,
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseInputStyles = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 
    placeholder-gray-400 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed
    focus:outline-none
  `;
  
  const getInputStyles = () => {
    if (error) {
      return `${baseInputStyles} border-error focus:border-error focus:ring-4 focus:ring-red-100 text-gray-900`;
    }
    if (focused) {
      return `${baseInputStyles} border-primary-500 focus:border-primary-600 focus:ring-4 focus:ring-primary-100 text-gray-900`;
    }
    return `${baseInputStyles} border-gray-300 hover:border-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 text-gray-900`;
  };
  
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <motion.div 
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {label && (
        <motion.label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
          animate={{ 
            color: focused ? '#059669' : error ? '#DC2626' : '#374151',
            scale: focused ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.input
          ref={ref}
          id={inputId}
          type={inputType}
          disabled={disabled}
          required={required}
          className={`${getInputStyles()} ${isPasswordType ? 'pr-12' : ''}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          whileFocus={{ 
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
          {...props}
        />
        
        {isPasswordType && (
          <motion.button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
            tabIndex={-1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={showPassword ? 'visible' : 'hidden'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        )}
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p 
            className="mt-2 text-sm text-error flex items-center"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg 
              className="h-4 w-4 mr-1 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </motion.svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      
      {helperText && !error && (
        <motion.p 
          className="mt-2 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {helperText}
        </motion.p>
      )}
    </motion.div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Input;