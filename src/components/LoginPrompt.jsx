import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function LoginPrompt({ 
  title = "Login Required", 
  message = "Please log in to access this feature", 
  icon = "lock",
  showBackground = true 
}) {
  const navigate = useNavigate();

  const icons = {
    lock: (
      <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    cart: (
      <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
      </svg>
    ),
    user: (
      <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    orders: (
      <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const content = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${showBackground ? 'bg-white rounded-2xl shadow-xl border border-gray-100' : ''} p-12 text-center max-w-md mx-auto`}
    >
      <motion.div variants={itemVariants} className="mb-6">
        {icons[icon]}
      </motion.div>
      
      <motion.h2 
        variants={itemVariants}
        className="text-2xl font-bold text-gray-900 mb-3"
      >
        {title}
      </motion.h2>
      
      <motion.p 
        variants={itemVariants}
        className="text-gray-600 mb-8 leading-relaxed"
      >
        {message}
      </motion.p>
      
      <motion.div 
        variants={itemVariants}
        className="space-y-4"
      >
        <Button
          variant="primary"
          size="large"
          onClick={() => navigate('/login')}
          className="w-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Sign In
        </Button>
        
        <Button
          variant="ghost"
          size="medium"
          onClick={() => navigate(-1)}
          className="w-full"
        >
          Go Back
        </Button>
      </motion.div>
    </motion.div>
  );

  if (showBackground) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        {content}
      </div>
    );
  }

  return content;
}

export default LoginPrompt;