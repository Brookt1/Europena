import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ShopItemCard from "./ShopItemCard";
import ShopItemSkeleton from "./ShopItemSkeleton"; // Import Skeleton Component
import shophero from "./assets/shophero.jpg";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import ProductCategories from "./ProductCategories";

function Shop() {
  const ITEMS_PER_PAGE = 8;
  const [showProducts, setShowProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    products,
    loading,
    error,
    categories,
    getCategories,
    categoryProducts,
    getProductsByCategory,
  } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (selectedCategory === 0) {
      setShowProducts(products);
      setCurrentPage(1);
    } else {
      getProductsByCategory(selectedCategory);
      setCurrentPage(1);
    }
  }, [products, selectedCategory, getProductsByCategory]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    if (selectedCategory === 0) {
      setShowProducts(products.slice(startIdx, startIdx + ITEMS_PER_PAGE));
    } else {
      if (categoryProducts.furniture) {
        setShowProducts(
          categoryProducts.furniture.slice(startIdx, startIdx + ITEMS_PER_PAGE)
        );
      }
    }
  }, [currentPage, products, selectedCategory, categoryProducts]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const totalPages =
    selectedCategory === 0
      ? Math.ceil(products.length / ITEMS_PER_PAGE)
      : categoryProducts.furniture
      ? Math.max(
          1,
          Math.ceil(categoryProducts.furniture.length / ITEMS_PER_PAGE)
        )
      : 1;

  // Event handler for page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (error)
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  return (
    <>
      
      {/* Hero Section */}
      <section
        className="mt-[3rem] md:mt-0 my-6 h-[20vh] rounded-2xl bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${shophero})` }}
      >
        <div>
          <h1 className="pb-2 text-4xl text-zinc-800 font-bold">Shop</h1>
          <Link to="/" className="text-gray-600 hover:underline">
            Home
          </Link>{" "}
          <span> &gt; shop </span>
        </div>
      </section>

      {/* Product section */}

      <section>
        <div className="p-4 flex flex-col lg:flex-row lg:space-x-16">
          {" "}
          {/* Adjusted to stack on smaller screens */}
          {/* Product Categories */}
          <ProductCategories
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
          />
          {/* Divider */}
          <div className="hidden lg:block w-[1px] bg-gray-300"></div>
          {/* Product Items */}
          {loading ? (
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                <ShopItemSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {showProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <ShopItemCard
                    image={product.images[0]?.url || "/default-image.jpg"}
                    name={product.name}
                    price={product.price}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center gap-2 p-2">
          {/* Previous button */}
          <button
            className={`w-20 h-10 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:border-black"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page number buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`w-10 h-10 border-solid ${
                currentPage === index + 1
                  ? "border-black font-bold"
                  : "border-gray-500 text-gray-500 hover:text-black hover:border-black"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            className={`w-20 h-10 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:border-black"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
      
    </>
  );
}

export default Shop;
