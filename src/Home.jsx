import { useContext, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import HomeCards from "./HomeCards";
import suspension from "./assets/Suspension.png"
import { ShopContext } from "./context/ShopContext.jsx";

function Home(){

    const products = useContext(ShopContext);

    return(
        <>
        
        <Header />
        {/* hero */}
        <section className=" relative rounded-s flex items-start pt-[120px] pl-[200px] h-screen w-screen bg-orange-200 z-0 min-[350px]:w-screen">
            <div className="mt-[15rem] ml-[-6rem] md:m-0 landingText text-center">
                <h1 className="text-3xl">european luxury</h1>
                <p>made for you</p>
                <button className="mt-12 w-[130px] p-[6px] border-solid border-2 rounded-md border-black hover:bg-gray-950 hover:text-white "><Link to='/shop'>Shop Now</Link></button>
            </div>
            <img className="min-[420px]:h-[400px] md:h-auto absolute top-0 right-4" src={suspension} alt="Luxury Suspension" />
        </section> 

        {/* Trending Items */}

        <section>
            <div className="flex flex-wrap lg:flex-nowrap justify-between p-8 gap-4">
                <Link to={`/product/${products[0]?.id}`}><HomeCards image={products[0]?.imageUrl} class="w-full lg:w-[45rem] h-[25rem] bg-emerald-900 rounded-md" /></Link>
                <Link to={`/product/${products[1]?.id}`}><HomeCards image={products[1]?.imageUrl} class="w-full lg:w-[25rem] h-[25rem] bg-orange-200 rounded-md" /></Link>
            </div>
            <h1 className="font-bold p-4 text-2xl">Trending This Week</h1>
            
            <div className="flex flex-col justify-between p-8 gap-4  lg:flex-row">
                {/* Right Column larger image */}

                <Link to={`/product/${products[2]?.id}`}><HomeCards image={products[2]?.imageUrl} class="w-full h-[40rem] bg-orange-200 rounded-md mb-4 lg:w-[35rem]" /></Link>
                
                {/* Left Column with 2x2 smaller image */}
                
                <div className="grid grid-cols-2 gap-4 lg:w-[30rem] lg:mr-8">
                    <Link to={`/product/${products[3]?.id}`}><HomeCards image={products[3]?.imageUrl} class="h-[19rem] lg:w-[15rem] bg-orange-200 rounded-md" /></Link>
                    <Link to={`/product/${products[4]?.id}`}><HomeCards image={products[4]?.imageUrl} class="h-[19rem] lg:w-[15rem] bg-orange-200 rounded-md" /></Link>
                    <Link to={`/product/${products[5]?.id}`}><HomeCards image={products[5]?.imageUrl} class="h-[20rem] lg:w-[15rem] bg-orange-200 rounded-md" /></Link>
                    <Link to={`/product/${products[6]?.id}`}><HomeCards image={products[6]?.imageUrl} class="h-[20rem] lg:w-[15rem] bg-orange-200 rounded-md" /></Link>
                </div>
            </div>
        </section>
        
        {/* Services -*/}        
        <section className="text-gray-900 h-dvh p-4 flex flex-col justify-center items-center bg-cover bg-center" >
            <h1 className="lg:mb-[5rem] text-3xl md:text-4xl lg:text-5xl text-center font-bold max-w-full">Services</h1>
            <div className="lg:flex lg:grid-cols-3 grid grid-cols-1 md:grid-cols-2 p-4 gap-x-16 gap-y-4 items-start max-w-full">
                <div className="max-w-xs break-words">
                    <h1 className="text-xl md:text-2xl font-semibold pb-2 md:pb-4">Custom Furniture Design</h1>
                    <p className="text-sm md:text-base">We create bespoke furniture pieces tailored to your unique style and space requirements. From contemporary to classic designs, our team works closely with you to bring your vision to life, using high-quality materials that stand the test of time.</p>
                </div>
                <div className="max-w-xs break-words">
                    <h1 className="text-xl md:text-2xl font-semibold pb-2 md:pb-4">Interior Styling and Consulting</h1>
                    <p className="text-sm md:text-base">Our expert designers help transform your space into a functional and aesthetically pleasing environment. Whether you’re furnishing a new home or refreshing a single room, our consulting services ensure every detail aligns with your vision and lifestyle.</p>
                </div>
                <div className="max-w-xs break-words">
                    <h1 className="text-xl md:text-2xl font-semibold pb-2 md:pb-4">Delivery and Installation</h1>
                    <p className="text-sm md:text-base">We provide seamless delivery and installation to make your furnishing experience hassle-free. Our skilled team handles everything from careful transportation to precise assembly, so you can start enjoying your new pieces right away.</p>
                </div>
            </div>
        </section>

        {/* Testimony */}
        <section className="py-8">
            <div className="block w-screen h-[50vh] bg-emerald-800">
                
            </div>
        </section>
        <Footer />
        

        </>
    );
}

export default Home