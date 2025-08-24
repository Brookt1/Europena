import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import logo from "./assets/logo.jpg";
import { ShopContext } from "./context/ShopContext";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuVisible, setVisible] = useState(false);
  const { cartSize, token, setToken, setShowSearch } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Hide header when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past a threshold – hide header
        setShowHeader(false);
      } else {
        // Scrolling up – show header
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
    // The header is always rendered in its position,
    // but we apply a transition that moves it off-screen when not visible.
    <header
      className={`
        fixed top-0 left-0 w-full z-50 bg-white shadow-md
        transition-transform duration-300
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <img className="h-[80px] w-auto" src={logo} alt="logo" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <NavLink to="/" className="hover:text-black transition">
            Home
          </NavLink>
          <NavLink to="/shop" className="hover:text-black transition">
            Shop
          </NavLink>
          <NavLink to="/about" className="hover:text-black transition">
            About
          </NavLink>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {location.pathname.includes("shop") && (
            <svg
              onClick={() => setShowSearch(true)}
              className="cursor-pointer w-6 h-6 text-gray-700 hover:text-black transition"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          )}
          <div className="relative">
            <Link to="/cart/1">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-black transition"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 6h15l-1.5 9h-12l-1.5-9zm1 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm10 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"></path>
              </svg>
            </Link>
            {cartSize > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartSize}
              </span>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <svg
              onClick={() => (token ? null : navigate("/login"))}
              className="w-6 h-6 text-gray-700 hover:text-black transition cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"></path>
            </svg>

            {token && (
              <div
                className={`absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 transition-opacity duration-300 ${
                  isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <p
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
          {/* Mobile Menu Icon */}
          <svg
            onClick={() => setVisible(true)}
            className="md:hidden w-6 h-6 text-gray-700 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>

      {/* Mobile Menu (if visible) */}
      <div
        className={`
          fixed top-0 right-0 h-screen bg-white shadow-lg transform transition-transform duration-300 overflow-hidden
          ${menuVisible ? "w-64" : "w-0"}
        `}
      >
        <div className="flex flex-col text-gray-700 p-5">
          <svg
            onClick={() => setVisible(false)}
            className="w-6 h-6 mb-4 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <NavLink to="/" className="py-2" onClick={() => setVisible(false)}>
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="py-2"
            onClick={() => setVisible(false)}
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className="py-2"
            onClick={() => setVisible(false)}
          >
            About
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
