import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import ShopItemCard from "./ShopItemCard";
import shophero from "./assets/shophero.jpg";

function Shop(){
    const BASE_URL = "https://furnitureapi-ykrq.onrender.com/api/furniture"
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    
    
    
    return (
        <>
        <Header />
        {/* Hero Section */}
        <section className="my-6 h-[20vh] rounded-2xl bg-center flex items-center justify-center text-center" style={{backgroundImage: `url(${shophero})` }}>
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
                            <div className="h-[14px] w-[14px] border-solid border-2 border-zinc-600 rounded-full hover:border-green-400 cursor-pointer"></div>
                            <span className="cursor-pointer">All</span>
                        </li>
                        <li className="flex space-x-2 items-center pb-4 text-gray-700">
                            <div className="h-[14px] w-[14px] border-solid border-2 border-zinc-600 rounded-full hover:border-green-400 cursor-pointer"></div>
                            <span className="cursor-pointer">Decor</span>
                        </li>
                        <li className="flex space-x-2 items-center pb-4 text-gray-700">
                            <div className="h-[14px] w-[14px] border-solid border-2 border-zinc-600 rounded-full hover:border-green-400 cursor-pointer"></div>
                            <span className="cursor-pointer">Lighting</span>
                        </li>
                        <li className="flex space-x-2 items-center pb-4 text-gray-700">
                            <div className="h-[14px] w-[14px] border-solid border-2 border-zinc-600 rounded-full hover:border-green-400 cursor-pointer"></div>
                            <span className="cursor-pointer">Sofa</span>
                        </li>
                    </ul>
                </div>
            
                {/* Divider */}
                <div className="hidden lg:block w-[1px] bg-gray-300"></div>
            
                {/* Product Items */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Products.map((product) =>(
                        <ShopItemCard key={product.id} image={product.imageUrl} name={product.name} price={product.price} />
                    ))}
                </div> 
            </div>
        
            {/* Page Number Buttons */}
            <div className="flex justify-center gap-2 p-2">
                <button className="w-10 h-10 border-solid border-black border-2">1</button>
                <button className="w-10 h-10 border-solid border-gray-500 border-2 text-gray-500 hover:text-black hover:border-black">2</button>
                <button className="w-20 h-10 border-solid bg-gray-200 font-semibold border-2 hover:bg-white hover:border-black">Next</button>
            </div>
        </section>
        <Footer />
        </>
    )
}

export default Shop