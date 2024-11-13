import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";
import { useContext } from "react";
import {ShopContext} from "./context/ShopContext";
import { useEffect } from "react";

function ProductDetail() {
    
    const productId = useParams();
    const Products = useContext(ShopContext);

    const [productData, setProductData] = useState(false);

    const fetchProductData = async () => {

        Products.map((product)=>{
            if (product.id === productId){
                setProductData(product)
                return null;
            }
        })
    }

    useEffect(()=>{
        fetchProductData();
    })

    
    const [activeTab, setActiveTab] = useState("description");

       const tabContent = {
        description: (
            <p className="text-gray-700">
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the
            unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
            <br />
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering...
        </p>
        ),
        "additional-info": (
            <ul className="text-gray-700 list-disc pl-6">
                <li>Height: 10 inches</li>
                <li>Width: 6 inches</li>
                <li>Weight: 7 pounds</li>
                {/* Add more details as needed */}
            </ul>
        ),
        review: (
            <>
                <div className="space-y-4 mb-4">
                    <p className="text-gray-700">"Amazing sound quality and build!" - Reviewer 1</p>
                    <p className="text-gray-700">"Perfect for road trips." - Reviewer 2</p>
                    <p className="text-gray-700">"High-quality product, worth the price." - Reviewer 3</p>
                    <p className="text-gray-700">"The vintage style is a great touch." - Reviewer 4</p>
                    <p className="text-gray-700">"Couldn’t be happier with the purchase." - Reviewer 5</p>
                </div>
                <form className="space-y-4">
                    <input className="w-full p-2 border rounded" type="text" placeholder="Your Name" required />
                    <input className="w-full p-2 border rounded" type="email" placeholder="Your Email" required />
                    <textarea className="w-full p-2 border rounded" rows="4" placeholder="Your Review" required></textarea>
                    <button className="px-4 py-2 bg-green-950 text-white rounded" type="submit">Submit Review</button>
                </form>
            </>
        ),
       };




    return(
        <>
            <Header/>
            <section className="grid grid-cols-1 gap-6 py-16 px-8 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1">
            {/* product Image section */}
            <div className="bg-orange-200 rounded-xl h-auto md:h-fit">
                <img className="rounded-xl" src="./src/images/servicePic.jpg" alt="Main product image"/>
                <div className="p-4 gap-4 grid grid-cols-3">
                    {/* alternate images */}
                    <div className="h-fit"><img src="./src/images/lamp.avif" alt="Alternate image"/></div>
                    <div className="h-fit"><img src="./src/images/lamp.avif" alt="Alternate image"/></div>
                    <div className="h-fit"><img src="./src/images/lamp.avif" alt="Alternate image"/></div>
                </div>
            </div>
            
            {/* Product price and description */}
            <div className="flex flex-col justify-start h-auto">
                <h1 className="text-3xl font-semibold mt-4 lg:ml-12 sm:ml-0">Some Random</h1>
                {/* Dynamic product review here */}
                <div className="flex items-center text-gray-600 gap-4 lg:ml-12 sm:ml-0 py-4">
                    {/* average rating */}
                    <h1 className="text-2xl bg-gray-300 rounded-xl p-2">4.5</h1>
                    {/* dynamic review stars */}
                    <div><div className="text-xl text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</div></div>
                    {/* Total number of reviews */}
                    <p className="tracking-widest text-lg">(290,291)</p>
                </div>
                
                <h1 className="text-2xl text-gray-600 lg:ml-12 sm:ml-0">$120</h1>
                
                <p className="p-4 text-gray-500 lg:ml-8 sm:ml-0">
                    Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                    <br/>
                    Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its className, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.
                    
                </p>
                
                <form className="flex md:ml-12 gap-4 pt-4">
                    <label><input className="w-14 h-14 p-2 text-xl border-gray-600 border-solid border-[1px]" type="number" placeholder="1"/></label>
                    <button className="flex gap-4 text-lg bg-green-950 text-gray-400 p-4 w-[500px] justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                        </svg>
                        <p>Add to cart</p>
                    </button>
                </form>

                <div className="md:ml-12 pt-6 flex gap-2">
                    <h1 className="">Catagory:</h1> 
                    {/* Catagory of item here */}
                    <a href="" className="text-gray-400">sofa</a>
                </div>
            </div>  
        </section>
        
        <section className="px-32 py-4">
            {/* Tab buttons with underline on active tab */}
            <div className="flex justify-center space-x-8 border-b-2 pb-2">
            {["description", "additional-info", "review"].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-btn px-4 py-2 text-lg ${
                            activeTab === tab ? "font-semibold border-b-2 border-green-900" : ""
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "description" ? "Description" : tab === "additional-info" ? "Additional Information" : "Review"}
                    </button>
                ))}
            </div>
                {/* Tab content */}
            <div className="tab-content mt-4">{tabContent[activeTab]}</div>
            
        </section>
        <Footer/>
        </>
    )
}

export default ProductDetail;