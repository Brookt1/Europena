import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ShopItemCard from "./ShopItemCard";
import shophero from "./assets/shophero.jpg";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import ProductCategories from "./ProductCategories";

function Shop() {
    const ITEMS_PER_PAGE = 8;
    const { products, loading, error, categories, getCategories, getProductsByCategory } = useContext(ShopContext);

    const [showProducts, setShowProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    useEffect(() => {
        if (selectedCategory === "All") {
            setShowProducts(products.slice(0, ITEMS_PER_PAGE));
            setCurrentPage(1);
        } else {
            getProductsByCategory(selectedCategory);
            setCurrentPage(1);
        }
    }, [products, selectedCategory, getProductsByCategory]);

    useEffect(() => {
        if (selectedCategory === "All") {
            const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
            setShowProducts(products.slice(startIdx, startIdx + ITEMS_PER_PAGE));
        } else {
            const filteredProducts = products.filter(product => product.category === selectedCategory);
            const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
            setShowProducts(filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE));
        }
    }, [currentPage, products, selectedCategory]);

    const totalPages = selectedCategory === "All"
        ? Math.ceil(products.length / ITEMS_PER_PAGE)
        : Math.ceil(products.filter(product => product.category === selectedCategory).length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

    return (
        <>
            <Header />
            {/* Hero Section */}
            <section className="mt-12 md:mt-0 my-6 h-52 md:h-80 rounded-2xl bg-center flex items-center justify-center text-center" style={{ backgroundImage: `url(${shophero})`, backgroundSize: 'cover' }}>
                <div className="bg-black bg-opacity-50 p-4 rounded">
                    <h1 className="pb-2 text-4xl text-white font-bold">Shop</h1>
                    <Link to="/" className="text-gray-300 hover:underline">Home</Link> <span className="text-gray-300"> &gt; Shop</span>
                </div>
            </section>

            {/* Product Section */}
            <section className="px-4">
                <div className="flex flex-col lg:flex-row lg:space-x-16">
                    
                    {/* Product Categories */}
                    <ProductCategories 
                        categories={categories} 
                        selectedCategory={selectedCategory} 
                        handleCategorySelect={handleCategorySelect} 
                    />
                
                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-gray-300"></div>
                
                    {/* Product Items */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {loading ? (
                            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                                <ShopItemCard key={index} loading={true} />
                            ))
                        ) : (
                            showProducts.map((product) => (
                                <Link key={product.id} to={`/product/${product.id}`}>
                                    <ShopItemCard 
                                        image={product.images[0]?.url || '/default-image.jpg'} 
                                        name={product.name} 
                                        price={product.price} 
                                        loading={false}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
                
                {/* Pagination Buttons */}
                <div className="flex justify-center gap-2 p-4">
                    <button
                        className={`w-20 h-10 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:border-black"}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={`w-10 h-10 border ${currentPage === index + 1 ? "border-black font-bold" : "border-gray-500 text-gray-500 hover:text-black hover:border-black"}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`w-20 h-10 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:border-black"}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Shop;