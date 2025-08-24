import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import logo from "./assets/logo.jpg";
import rug from "./assets/rug.jpeg";
import lamp from "./assets/lux lamp.jpeg";
import chair from "./assets/about1.jpeg";

const About = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="mt-4 md:mt-0 relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/servicePic.jpg')" }}
      >
        <div className="bg-green-950 bg-opacity-50 w-full h-full absolute top-0 left-0" />
        <div className="z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Discover the Essence of European Luxury
          </h1>
          <p className="text-lg md:text-2xl mt-4">
            Crafting timeless elegance and exclusivity.
          </p>
          <Button
            variant="primary"
            size="large"
            onClick={handleShopNowClick}
            className="mt-6 px-10 py-4 text-xl font-bold bg-amber-500 hover:bg-amber-600 text-black shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="md:flex md:items-center md:space-x-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extralight mb-4">Who <span className="text-green-950 font-bold">We</span> Are</h2>
            <p className="text-lg text-gray-600">
              European Luxury is more than a brand; it's a statement of timeless
              elegance. Founded with a passion for sophistication and an eye for
              detail, we curate exclusive collections to elevate your lifestyle.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <img
              src={logo}
              alt="About European Luxury"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Vision and Values Section */}
      <section className="py-16 bg-gray-100 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extralight text-center mb-8">
          Our <span className="text-green-950 font-bold">Vision & Values</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Craftsmanship</h3>
            <p className="text-gray-600">
              We focus on exceptional quality and attention to detail.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              Committed to eco-friendly and ethical practices.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Exclusivity</h3>
            <p className="text-gray-600">
              Each collection is designed to offer unparalleled uniqueness.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Collection Section */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extralight text-center mb-8">
          Our Signature <span className="text-green-950 font-bold">Collection</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-full h-96 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={chair}
                alt="Product 1"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-semibold mt-4">Luxury Chair</p>
            <Button
              variant="primary"
              size="medium"
              onClick={handleShopNowClick}
              className="mt-4 bg-green-900 hover:bg-green-800 text-white"
            >
              View Collection
            </Button>
          </div>
          <div className="text-center">
            <div className="w-full h-96 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={lamp}
                alt="Product 2"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-semibold mt-4">Designer Lamp</p>
            <Button
              variant="primary"
              size="medium"
              onClick={handleShopNowClick}
              className="mt-4 bg-green-900 hover:bg-green-800 text-white"
            >
              View Collection
            </Button>
          </div>
          <div className="text-center">
            <div className="w-full h-96 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={rug}
                alt="Product 3"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-semibold mt-4">Luxury Rug</p>
            <Button
              variant="primary"
              size="medium"
              onClick={handleShopNowClick}
              className="mt-4 bg-green-900 hover:bg-green-800 text-white"
            >
              View Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extralight text-center mb-8">
          What Our <span className="text-green-950 font-bold">Clients</span> Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600">
              "European Luxury exceeded my expectations. Their products are
              truly exquisite!"
            </p>
            <p className="mt-4 font-semibold">- Alex Johnson</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600">
              "The quality and craftsmanship are unmatched. Highly recommended!"
            </p>
            <p className="mt-4 font-semibold">- Sarah Williams</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600">
              "Absolutely love their collection. It adds a touch of elegance to
              my home."
            </p>
            <p className="mt-4 font-semibold">- Michael Lee</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-3xl md:text-4xl font-extralight mb-4">
          Experience the World of European <span className="text-green-950 font-bold">Luxury</span>
        </h2>
        <Button
          variant="primary"
          size="large"
          onClick={handleShopNowClick}
          className="mt-4 px-10 py-4 text-xl font-semibold bg-green-800 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Shop Now
        </Button>
      </section>
    </div>
  );
};

export default About;
