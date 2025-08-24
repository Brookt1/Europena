import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "./context/ShopContext";
import Button from "./components/Button";
import logo from "./assets/logo.jpg";

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setShowSearch, getCartSize, token, setToken } = useContext(ShopContext);
  
  const cartSize = getCartSize();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 transition-all duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="transition-transform duration-200 hover:scale-105">
          <img className="h-[80px] w-auto" src={logo} alt="European Luxury Logo" />
        </Link>

        <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `hover:text-primary-600 transition-colors duration-200 relative py-2 ${
                isActive ? 'text-primary-600 font-semibold' : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    layoutId="activeNavLine"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
          <NavLink 
            to="/shop"
            className={({ isActive }) => 
              `hover:text-primary-600 transition-colors duration-200 relative py-2 ${
                isActive ? 'text-primary-600 font-semibold' : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                Shop
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    layoutId="activeNavLine"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
          <NavLink 
            to="/about"
            className={({ isActive }) => 
              `hover:text-primary-600 transition-colors duration-200 relative py-2 ${
                isActive ? 'text-primary-600 font-semibold' : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                About
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                    layoutId="activeNavLine"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          {location.pathname.includes("shop") && (
            <motion.button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </motion.button>
          )}
          
          <div className="relative">
            <Link 
              to="/cart/1"
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 relative"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6h15l-1.5 9h-12l-1.5-9zm1 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm10 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"></path>
              </svg>
              {cartSize > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {cartSize}
                </span>
              )}
            </Link>
          </div>

          {token ? (
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              
              {isDropdownOpen && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Profile Menu</p>
                  </div>
                  <button 
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => navigate("/orders")}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                  >
                    My Orders
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Button 
              variant="primary" 
              size="small" 
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          )}

          <motion.button
            onClick={() => setMenuVisible(true)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuVisible && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuVisible(false)}
            />
            
            <motion.div 
              className="fixed top-0 right-0 h-screen bg-white shadow-xl z-50 md:hidden overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: 320 }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col text-gray-700 p-6 pt-8">
                <motion.button
                  onClick={() => setMenuVisible(false)}
                  className="w-8 h-8 mb-8 self-end rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>
                
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                <NavLink 
                  to="/" 
                  className="block py-3 px-4 rounded-lg text-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-all duration-200" 
                  onClick={() => setMenuVisible(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className="block py-3 px-4 rounded-lg text-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                  onClick={() => setMenuVisible(false)}
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/about"
                  className="block py-3 px-4 rounded-lg text-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                  onClick={() => setMenuVisible(false)}
                >
                  About
                </NavLink>
                
                {token && (
                  <>
                    <hr className="my-4 border-gray-200" />
                    <NavLink
                      to="/profile"
                      className="block py-3 px-4 rounded-lg text-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                      onClick={() => setMenuVisible(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="block py-3 px-4 rounded-lg text-lg font-medium hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                      onClick={() => setMenuVisible(false)}
                    >
                      Orders
                    </NavLink>
                    <button
                      onClick={() => {
                        logout();
                        setMenuVisible(false);
                      }}
                      className="w-full text-left py-3 px-4 rounded-lg text-lg font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                )}
                
                {!token && (
                  <>
                    <hr className="my-4 border-gray-200" />
                    <Button
                      variant="primary"
                      size="medium"
                      onClick={() => {
                        navigate("/login");
                        setMenuVisible(false);
                      }}
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  </>
                )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
