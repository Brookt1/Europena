import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import LoginPrompt from './LoginPrompt';
import { ClipLoader } from 'react-spinners';

function ProtectedRoute({ 
  children, 
  loadingComponent = null,
  title = "Authentication Required", 
  message = "Please log in to access this feature",
  icon = "lock",
  requireAuth = true
}) {
  const { token, loading } = useContext(ShopContext);

  // Show loading state if specified
  if (loading && loadingComponent) {
    return loadingComponent;
  }

  // Show default loading if no custom component provided
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4caf50" size={60} />
      </div>
    );
  }

  // Check authentication if required
  if (requireAuth && !token) {
    return (
      <LoginPrompt 
        title={title}
        message={message}
        icon={icon}
      />
    );
  }

  return children;
}

export default ProtectedRoute;