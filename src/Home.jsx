import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeCards from "./HomeCards";
import fridge from "./assets/Fridge.png";
import sofa from "./assets/sofa.png";
import light from "./assets/light.png";
import door from "./assets/door.jpeg";
import cabinet from "./assets/cabinet.png";
import decor from "./assets/Decor.jpeg";
import sink from "./assets/sink.png";
import { ShopContext } from "./context/ShopContext.jsx";

function Home() {
  const { products, setSelectedCategory } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()


  const handleCategory = (id) => {
    console.log("Category clicked:");
    setSelectedCategory(id);
    console.log("Category clicked with:", id);
    navigate('/shop')
    
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const currentProduct = products[currentIndex];

  

  return (
    <>
      {/* hero */}

      {/* <section className=" relative rounded-s flex items-start pt-[120px] pl-[200px] h-screen w-screen bg-orange-200 z-0 min-[350px]:w-screen">
        <div className="mt-[15rem] ml-[-6rem] md:m-0 landingText text-center">
          <h1 className="text-3xl">european luxury</h1>
          <p>made for you</p>
          <button className="mt-12 w-[130px] p-[6px] border-solid border-2 rounded-md border-black hover:bg-gray-950 hover:text-white ">
            <Link to="/shop">Shop Now</Link>
          </button>
        </div>
        <img
          className="min-[420px]:h-[400px] md:h-auto absolute top-0 right-4"
          src={suspension}
          alt="Luxury Suspension"
        />
      </section> */}
      <div className="home-page">
        <section className="mt-4 md:mt-0 relative flex flex-col md:flex-row items-start md:items-center pt-[120px] px-4 md:pl-[200px] h-screen w-[95%] mx-auto bg-gray-100 z-0 rounded-s overflow-hidden">
          <div className="mt-[15rem] md:ml-[-5rem] md:m-0 landingText text-center mx-auto md:text-left landingText md:pr-8">
            <h1 className="text-3xl animate-fade-in">{currentProduct?.name}</h1>
            <p className="animate-fade-in">
              {currentProduct?.price?.toFixed(2)}{" "}
              <span className="text-amber-500">ETB</span>
            </p>
            <button className="mt-12 w-[130px] p-[6px] border-solid border-2 rounded-md border-black hover:bg-gray-950 hover:text-white">
              <Link to={`/product/${currentProduct?.id}`}>Shop Now</Link>
            </button>
          </div>

          {/* Display the current image with animation */}
          <img
            key={currentIndex}
            className={`absolute md:relative ${
              currentIndex === 0 ? "animate-slide-down" : "animate-slide-left"
            } min-[420px]:h-[300px] md:h-[400px] lg:h-auto md:right-[150px]`}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              right: "-5%",
            }}
            src={products[currentIndex]?.images[0]?.url}
            alt={products[currentIndex]?.name}
          />

          {/* Navigation Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-4">
            <button
              className="p-2  text-black rounded-md  hover:text-green-900"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="p-2  text-black rounded-md  hover:text-green-900"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="py-16 px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-extralight text-center mb-8">
            Explore Our{" "}
            <span className="text-green-950 font-bold">Categories</span>
          </h2>
          <div
          onClick={() => handleCategory(1)} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group h-64 hover: cursor-pointer">
              {" "}
              {/* Set a fixed height */}
              <img
                // src="https://www.migefurniture.com/wp-content/uploads/2020/10/CONTROL-BT-6.jpg"
                src={sofa}
                alt="Furniture"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center rounded-lg">
                <h3 className="text-white text-xl font-semibold">Furniture</h3>
              </div>
            </div>
            <div 
            onClick={() => handleCategory(2)}
            className="relative group h-64 hover: cursor-pointer">
              {" "}
              {/* Set a fixed height */}
              <img
                // src="https://images-cdn.ubuy.co.in/66461fc2c3cd8447223d3264-led-golden-branch-crystal-chandelier.jpg"
                src={light}
                alt="Lighting"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center rounded-lg">
                <h3 className="text-white text-xl font-semibold">Lighting</h3>
              </div>
            </div>
            <div
            onClick={() => handleCategory(4)} 
            className="relative group h-64 hover: cursor-pointer">
              {" "}
              <img
                // src="https://www.coasterfurniture.com/wp-content/uploads/Art-Deco-furniture-in-gold.jpeg"
                src={decor}
                alt="Decor"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center rounded-lg">
                <h3 className="text-white text-xl font-semibold">Décor</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="py-16 bg-gray-100 px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-extralight text-center mb-8">
            Trending <span className="text-green-950 font-bold">Products</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg mb-4 bg-white group">
                <img
                  src={products[3]?.images[0].url}
                  alt="Product 1"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <p className="font-semibold text-xl text-black">{products[3]?.name}</p>
              <button className="mt-4 px-4 py-1 bg-black text-white font-medium rounded-md hover:bg-opacity-80">
                <Link to={`/product/${products[3]?.id}`}>View Product</Link>
              </button>
            </div>
            <div className="text-center">
              <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg mb-4 bg-white group">
                <img
                  src={products[7]?.images[0].url}
                  alt="Product 2"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <p className="font-semibold text-xl">{products[7]?.name}</p>
              <button className="mt-4 px-4 py-1 bg-black text-white font-medium rounded-md hover:bg-opacity-80">
                <Link to={`/product/${products[7]?.id}`}>View Product</Link>
              </button>
            </div>
            <div className="text-center">
              <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg mb-4 bg-white group">
                <img
                  src={products[6]?.images[0].url}
                  alt="Product 3"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <p className="font-semibold text-xl">{products[6]?.name}</p>
              <button className="mt-4 px-4 py-1 bg-black text-white font-medium rounded-md hover:bg-opacity-80">
                <Link to={`/product/${products[6]?.id}`}>View Product</Link>
              </button>
            </div>
            <div className="text-center">
              <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg mb-4 bg-white group">
                <img
                  src={products[4]?.images[0].url}
                  alt="Product 4"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <p className="font-semibold text-xl">{products[4]?.name}</p>
              <button className="mt-4 px-4 py-1 bg-black text-white font-medium rounded-md hover:bg-opacity-80">
                <Link to={`/product/${products[4]?.id}`}>View Product</Link>
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-extralight text-center mb-8">
            Why Choose European{" "}
            <span className="text-green-950 font-bold">Luxury</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Craftsmanship</h3>
              <p className="text-gray-600">
                Experience unmatched quality and detail in every product.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We prioritize eco-friendly and ethical practices.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Exclusivity</h3>
              <p className="text-gray-600">
                Our collections are curated to offer unique and timeless
                elegance.
              </p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 bg-black text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extralight mb-8">
            Experience the Luxury{" "}
            <span className="text-green-950 font-bold">Lifestyle</span>
          </h2>
          <div className="relative w-full max-w-4xl mx-auto">
            <video
              controls
              className="rounded-lg shadow-lg w-full"
              poster="/path-to-video-thumbnail.jpg"
            >
              <source
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-extralight text-center mb-8">
            What Our <span className="text-green-950 font-bold">Clients</span>{" "}
            Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600">
                "Their products are truly exquisite and add elegance to any
                space."
              </p>
              <p className="mt-4 font-semibold">- Alex Johnson</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600">
                "Exceptional craftsmanship and quality. Highly recommended!"
              </p>
              <p className="mt-4 font-semibold">- Sarah Williams</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600">
                "European Luxury is my go-to for elegant and unique home
                pieces."
              </p>
              <p className="mt-4 font-semibold">- Michael Lee</p>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="py-16 bg-gray-100 px-6 md:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Get in Touch
          </h2>
          <div className="max-w-3xl mx-auto">
            <form className="grid grid-cols-1 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-md hover:bg-opacity-80"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Trending Items */}

      {/* <section>
        <div className="flex flex-wrap lg:flex-nowrap justify-between p-8 gap-4">
          <Link to={`/product/${products[0]?.id}`}>
            <HomeCards
              image={products[0]?.images[0].url}
              name={products[0]?.name}
              class="w-full lg:w-[48rem] h-[25rem] "
            />
          </Link>
          <Link to={`/product/${products[1]?.id}`}>
            <HomeCards
              image={products[1]?.images[0].url}
              name={products[1]?.name}
              class="w-full lg:w-[28rem] h-[25rem]"
            />
          </Link>
        </div>
        <h1 className="font-bold p-4 text-2xl">Trending This Week</h1>

        

        <div className="flex flex-col gap-8 p-8">
          
          <Link to={`/product/${products[2]?.id}`}>
            <HomeCards
              image={products[2]?.images[0].url}
              name={products[2]?.name}
              class="w-[95%] mx-auto h-[40rem] lg:h-[35rem] lg:w-[90%]"
            />
          </Link>

          
          <div className="grid grid-cols-2 gap-4 w-full">
            <Link to={`/product/${products[3]?.id}`}>
              <HomeCards
                image={products[3]?.images[0].url}
                name={products[3]?.name}
                class="h-[15rem] lg:h-[19rem] w-full"
              />
            </Link>
            <Link to={`/product/${products[4]?.id}`}>
              <HomeCards
                image={products[4]?.images[0].url}
                name={products[4]?.name}
                class="h-[15rem] lg:h-[19rem] w-full"
              />
            </Link>
            <Link to={`/product/${products[5]?.id}`}>
              <HomeCards
                image={products[5]?.images[0].url}
                name={products[5]?.name}
                class="h-[15rem] lg:h-[19rem] w-full"
              />
            </Link>
            <Link to={`/product/${products[6]?.id}`}>
              <HomeCards
                image={products[6]?.images[0].url}
                name={products[6]?.name}
                class="h-[15rem] lg:h-[19rem] w-full"
              />
            </Link>
          </div>
        </div>
      </section>

      
      <section className="text-gray-900 h-dvh p-4 pt-12 flex flex-col justify-center items-center bg-cover bg-center">
        <h1 className="lg:mb-[5rem] text-3xl md:text-4xl lg:text-5xl text-center font-bold max-w-full">
          Services
        </h1>
        <div className="lg:flex lg:grid-cols-3 grid grid-cols-1 md:grid-cols-2 p-4 gap-x-16 gap-y-4 items-start max-w-full">
          <div className="max-w-xs break-words">
            <h1 className="text-xl md:text-2xl font-semibold pb-2 md:pb-4">
              Custom Furniture Design
            </h1>
            <p className="text-sm md:text-base">
              We create bespoke furniture pieces tailored to your unique style
              and space requirements. From contemporary to classic designs, our
              team works closely with you to bring your vision to life, using
              high-quality materials that stand the test of time.
            </p>
          </div>
          <div className="max-w-xs break-words">
            <h1 className="text-xl md:text-2xl font-semibold pb-2 md:pb-4">
              Interior Styling and Consulting
            </h1>
            <p className="text-sm md:text-base">
              Our expert designers help transform your space into a functional
              and aesthetically pleasing environment. Whether you’re furnishing
              a new home or refreshing a single room, our consulting services
              ensure every detail aligns with your vision and lifestyle.
            </p>
          </div>
          <div className="max-w-xs break-words">
            <h1 className="text-xl md:text-2xl font-semibold pb-2 md:pb-4">
              Delivery and Installation
            </h1>
            <p className="text-sm md:text-base">
              We provide seamless delivery and installation to make your
              furnishing experience hassle-free. Our skilled team handles
              everything from careful transportation to precise assembly, so you
              can start enjoying your new pieces right away.
            </p>
          </div>
        </div>
      </section> */}

      {/* Testimony */}
      {/* <section className="py-8">
        <div className="block w-screen h-[50vh] bg-emerald-800"></div>
      </section> */}
    </>
  );
}

export default Home;
