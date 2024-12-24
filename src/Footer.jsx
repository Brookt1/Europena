import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border border-solid">
      <div className="block w-full h-auto bg-black">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap justify-between">
            {/* About Us Section */}
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                About Us
              </h2>
              <p className="text-gray-400">
                We specialize in high-quality, stylish furniture designed to
                bring comfort and elegance to every space.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h2>
              <ul className="text-gray-400 space-y-2">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-white">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service Section */}
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Customer Service
              </h2>
              <ul className="text-gray-400 space-y-2">
                <li>
                  <Link to="#" className="hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-400">
                123 Furniture Lane, Hometown, ST 12345
              </p>
              <p className="text-gray-400">Email: support@european.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} European. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
