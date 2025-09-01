import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import LoginPrompt from './LoginPrompt';

function AuthGuard({ 
  children, 
  title = "Authentication Required", 
  message = "Please log in to access this feature",
  icon = "lock"
}) {
  const { token } = useContext(ShopContext);

  if (!token) {
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

export default AuthGuard;