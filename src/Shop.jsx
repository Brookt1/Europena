import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ShopItemCard from "./ShopItemCard";
import shophero from "./assets/shophero.jpg";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "./context/ShopContext";


function Shop(){
    
    const ITEMS_PER_PAGE = 8;
    const Products = useContext(ShopContext);
    const [showProducts, setShowProducts] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);

    const [copyProducts, setCopyProducts] = useState([]);

    


    


    // Setting up category and Filters

    const BASE_URL = "https://furnitureapi-ykrq.onrender.com/api/categories"
    const [Category, setCategory] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setCategory(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const [filter, setFilter] = useState();
    const [categoryId, setCategoryId] = useState();

    const changeFilter = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => { 
        if (filter) { 
            // Find the category based on the selected filter.
            const category = Category.find((item) => item.name === filter); 
            if (category) { 
                setCategoryId(category.id); 
            } else { 
                console.log('Category not found'); 
                setCategoryId(null); 
            } 
        } 
    }, [filter]);

    useEffect(() => { 
        if (categoryId !== null) { 
            // Filter products based on the selected category ID.
            const filteredProducts = Products.filter((product) => product.categoryId === categoryId); 
            setCopyProducts(filteredProducts); 
        } else { 
            setCopyProducts([]); 
        } 
    }, [categoryId]);


    

    useEffect(()=>{
        console.log(copyProducts);
    },[copyProducts])


    // Update displayed products when the current page or total products change
    useEffect(() => {
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        setShowProducts(copyProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE));
        console.log(startIdx);
    }, [copyProducts, currentPage]);

    // Calculate total pages
    const totalPages = Math.ceil(copyProducts.length / ITEMS_PER_PAGE);

    // Event handler for page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };



    


    
    return (
        <>
        <Header />
        {/* Hero Section */}
        <section className="mt-[3rem] md:mt-0 my-6 h-[20vh] rounded-2xl bg-center flex items-center justify-center text-center" style={{backgroundImage: `url(${shophero})` }}>
            <div>
                <h1 className="pb-2 text-4xl text-zinc-800 font-bold">Shop</h1>
                <Link to="/" className="text-gray-600 hover:underline">Home</Link> <span> &gt; shop </span>
            </div>
        </section>

        {/* Product section */}

        <section>
            <div className="p-4 flex flex-col lg:flex-row lg:space-x-16"> {/* Adjusted to stack on smaller screens */}
                
                {/* Product Categories */}
                <div className="w-full lg:w-[40vh] mb-6 lg:mb-0">
                    <h1 className="p-2 text-xl text-zinc-800">Product Categories</h1>
                    <hr />
                    <ul className="p-2">
                        <li className="flex space-x-2 items-center pb-4 text-gray-700">
                            {/* <div className="h-[14px] w-[14px] border-solid border-2 border-zinc-600 rounded-full hover:border-green-400 cursor-pointer"></div> */}
                                <label className="relative flex items-center cursor-pointer" htmlFor="all">
                                    <input
                                    name="filter"
                                    value={'all'}
                                    type="radio"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-900 transition-all"
                                    id="all"
                                    onChange={changeFilter}
                                    />
                                    <span className="absolute bg-green-900 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                </label>
                                <label htmlFor="all">All</label>
                        </li>
                        <li className="flex space-x-2 items-center pb-4 text-gray-700">
                            {/* <div className="h-[14px] w-[14px] border-solid border-2 border-zinc-600 rounded-full hover:border-green-400 cursor-pointer"></div> */}
                            <label className="relative flex items-center cursor-pointer" htmlFor="Chair">
                                    <input
                                    name="filter"
                                    value={'Chair'}
                                    type="radio"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-900 transition-all"
                                    id="Chair"
                                    onChange={changeFilter}
                                    />
                                    <span className="absolute bg-green-900 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <label htmlFor="Chair">Chair</label>
                        </li>
                        <li className="flex space-x-2 items-center pb-4 text-gray-700">
                            {/* <div className="h-[14px] w-[14px] border-solid border-2 border-zinc-600 rounded-full hover:border-green-400 cursor-pointer"></div> */}
                            <label className="relative flex items-center cursor-pointer" htmlFor="Bed">
                                    <input
                                    name="filter"
                                    value={'Bed'}
                                    type="radio"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-900 transition-all"
                                    id="Bed"
                                    onChange={changeFilter}
                                    />
                                    <span className="absolute bg-green-900 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <label htmlFor="Bed">Bed</label>
                        </li>
                        <li className="flex space-x-2 items-center pb-4 text-gray-700">
                            {/* <div className="h-[14px] w-[14px] border-solid border-2 border-zinc-600 rounded-full hover:border-green-400 cursor-pointer"></div> */}
                            <label className="relative flex items-center cursor-pointer" htmlFor="Cabinet">
                                    <input
                                    name="filter"
                                    value={'Cabinet'}
                                    type="radio"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-green-900 transition-all"
                                    id="Cabinet"
                                    onChange={changeFilter}
                                    />
                                    <span className="absolute bg-green-900 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <label htmlFor="Cabinet">Cabinet</label>
                        </li>
                    </ul>
                </div>
            
                {/* Divider */}
                <div className="hidden lg:block w-[1px] bg-gray-300"></div>
            
                {/* Product Items */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {showProducts.map((product) =>(
                        <Link to={`/product/${Number(product.id)}`}><ShopItemCard key={product.id} image={product.images[0]["url"]} name={product.name} price={product.price} /></Link>
                    ))}
                </div> 
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center gap-2 p-2">
                {/* Previous button */}
                <button
                    className={`w-20 h-10 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:border-black"}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Page number buttons */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`w-10 h-10 border-solid ${currentPage === index + 1 ? "border-black font-bold" : "border-gray-500 text-gray-500 hover:text-black hover:border-black"}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* Next button */}
                <button
                    className={`w-20 h-10 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:border-black"}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        
            {/* Page Number Buttons
            <div className="flex justify-center gap-2 p-2">
                <button className="w-10 h-10 border-solid border-black border-2">1</button>
                <button className="w-10 h-10 border-solid border-gray-500 border-2 text-gray-500 hover:text-black hover:border-black">2</button>
                <button className="w-20 h-10 border-solid bg-gray-200 font-semibold border-2 hover:bg-white hover:border-black">Next</button>
            </div> */}
        </section>
        <Footer />
        </>
    )
}

export default Shop