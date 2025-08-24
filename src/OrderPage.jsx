import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";
import Button from "./components/Button";
import Input from "./components/Input";

function OrderPage() {
  const { setCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };


  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default behavior.
    console.log(formData);
  
    try {
      const response = await axiosInstance.post("/order", formData); // Await the post request.
      console.log(response);
  
      if (response.status === 200 || response.status === 201) {
        // Order was successfully created
        setCart([]); // Clear the cart
        toast.success("Order placed successfully!");
        navigate("/orders")
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <form onSubmit={onSubmitHandler} className="grid lg:grid-cols-2 gap-12">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                <span className="text-primary-600">Your</span> Information
              </h1>
              <p className="text-gray-600">Please provide your details for delivery</p>
              <div className="h-1 w-16 bg-primary-500 rounded-full mt-4"></div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={onChangeHandler}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={onChangeHandler}
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="City"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={onChangeHandler}
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  required
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Summary</h2>
              <p className="text-gray-600">Review your items and total</p>
            </div>
            
            <CartItem />
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                size="large"
                className="w-full text-lg font-semibold"
              >
                Place Order Now
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Your order will be processed securely
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
