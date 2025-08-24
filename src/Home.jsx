import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Header from "./Header";
import HomeCards from "./HomeCards";
import Button from "./components/Button";
import fridge from "./assets/Fridge.png";
import sofa from "./assets/sofa.png";
import light from "./assets/light.jpg";
import door from "./assets/door.jpeg";
import cabinet from "./assets/cabinet.png";
import decor from "./assets/decor.jpg";
import sink from "./assets/sink.png";
import { ShopContext } from "./context/ShopContext.jsx";

function Home() {
  const { products, setSelectedCategory } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleCategory = (id) => {
    setSelectedCategory(id);
    navigate("/shop");
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
      {/* Hero Section */}
      <div className="home-page pt-4">
        <section className="relative flex flex-col md:flex-row items-center justify-center pt-[120px] px-4 md:px-[200px] h-screen w-[95%] mx-auto bg-gradient-to-br from-gray-50 to-white z-0 rounded-2xl overflow-hidden shadow-lg">
          {/* Text Container */}
          <div className="landingText text-center mx-auto md:text-left md:pr-8 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-gray-900 animate-fade-in">
              {currentProduct?.name}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 animate-fade-in">
              <span className="text-3xl md:text-4xl font-bold text-primary-600">
                {currentProduct?.price?.toFixed(2)}
              </span>
              <span className="text-accent-gold font-medium ml-2">ETB</span>
            </p>
            <div className="mt-8">
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate(`/product/${currentProduct?.id}`)}
                className="px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Discover Now
              </Button>
            </div>
          </div>

          {/* Product Image with Enhanced Animation and Modern Styling */}
          <div className="relative md:ml-8 group">
            <img
              key={currentIndex}
              className={`${
                currentIndex === 0 ? "animate-slide-down" : "animate-slide-left"
              } rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1`}
              style={{
                objectFit: "contain",
                width: "750px",
                height: "550px",
                maxWidth: "100%",
              }}
              src={products[currentIndex]?.images[0]?.url}
              alt={products[currentIndex]?.name}
            />
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent-gold/20 rounded-full opacity-60 animate-bounce"></div>
          </div>

          {/* Enhanced Navigation Buttons */}
          <div className="absolute bottom-8 right-8 flex gap-4">
            <Button
              variant="secondary"
              size="medium"
              onClick={handlePrevious}
              className="backdrop-blur-sm bg-white/80 border-2 border-primary-200 hover:bg-primary-50"
            >
              Previous
            </Button>
            <Button
              variant="primary"
              size="medium"
              onClick={handleNext}
              className="backdrop-blur-sm shadow-lg"
            >
              Next
            </Button>
          </div>
        </section>
      </div>

      {/* Featured Categories Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-4 tracking-wide text-gray-900">
            Explore Our{" "}
            <span className="text-primary-600 font-semibold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Discover our carefully curated collection of luxury furniture and home décor
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, image: sofa, name: "Furniture" },
              { id: 12, image: decor, name: "Porcelain" },
              { id: 9, image: light, name: "Door" },
            ].map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategory(category.id)}
                className="relative group h-80 cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
              >
                {/* Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Enhanced Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-primary-900/80 group-hover:via-primary-600/40"></div>
                
                {/* Category Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent-gold transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    Discover our premium collection
                  </p>
                </div>
                
                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 group-hover:scale-110">
                  <div className="w-full h-full rounded-full bg-accent-gold/20 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-8 tracking-wide">
          Trending{" "}
          <span className="text-green-900 font-semibold">Products</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <div key={index} className="text-center">
              <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white group transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
                {/* Image with Hover Overlay */}
                <img
                  src={product?.images[0]?.url || "/default-image.jpg"}
                  alt={product?.name}
                  className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                {/* Subtle overlay effect */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>

              {/* Product Name */}
              <p className="font-medium text-lg text-gray-800 mt-3 tracking-wide">
                {product?.name}
              </p>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="medium"
                onClick={() => navigate(`/product/${product?.id}`)}
                className="mt-6 px-8 py-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                View Product
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-8 tracking-wide">
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
              Our collections are curated to offer unique and timeless elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-8 tracking-wide">
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
        <h2 className="text-3xl md:text-4xl font-light text-center mb-8 tracking-wide">
          What Our <span className="text-green-950 font-bold">Clients</span> Say
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
              "European Luxury is my go-to for elegant and unique home pieces."
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
              className="w-[95%] mx-auto h-[40rem] lg:h-[35rem] lg:w-[90%]"
            />
          </Link>

          
          <motion.div
            className="grid grid-cols-2 gap-4 w-full"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
              <Link to={`/product/${products[3]?.id}`}>
                <HomeCards
                  image={products[3]?.images[0].url}
                  name={products[3]?.name}
                  className="h-[15rem] lg:h-[19rem] w-full"
                />
              </Link>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
              <Link to={`/product/${products[4]?.id}`}>
                <HomeCards
                  image={products[4]?.images[0].url}
                  name={products[4]?.name}
                  className="h-[15rem] lg:h-[19rem] w-full"
                />
              </Link>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
              <Link to={`/product/${products[5]?.id}`}>
                <HomeCards
                  image={products[5]?.images[0].url}
                  name={products[5]?.name}
                  className="h-[15rem] lg:h-[19rem] w-full"
                />
              </Link>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
              <Link to={`/product/${products[6]?.id}`}>
                <HomeCards
                  image={products[6]?.images[0].url}
                  name={products[6]?.name}
                  className="h-[15rem] lg:h-[19rem] w-full"
                />
              </Link>
            </motion.div>
          </motion.div>
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
