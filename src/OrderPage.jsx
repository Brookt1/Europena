import CartItem from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShopContext } from "./context/ShopContext";
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

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
    <>
      <form onSubmit={onSubmitHandler} className="sm:flex md:grid md:grid-cols-2 p-4 mt-16">
        <div className="font-medium grid grid-cols-1">
          <h1 className="text-2xl font-extralight">
            <span className="text-green-950 font-semibold">YOUR</span>{" "}
            INFORMATION
          </h1>
          <div className="p-4">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              className="border m-2 p-1 rounded-md"
              type="text"
              required
            ></input>
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              className="border m-2 p-1 rounded-md"
              type="text"
              required
            ></input>
          </div>
          <div className="p-4">
            <input
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              placeholder="Email address"
              className="border m-2 p-1 rounded-md"
              type="email"
              required
            ></input>
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              placeholder="City"
              className="border m-2 p-1 rounded-md"
              type="text"
            ></input>
          </div>
          <div className="p-4">
            <input
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              placeholder="Phone Number"
              className="border m-2 p-1 rounded-md"
              type="tel"
              required
            ></input>
          </div>
        </div>
        <div className="mt-4">
          <CartItem />
          <div className="w-full text-end">
            <button type="submit" className="bg-green-800 p-2 mt-8 ">
              <span className="font-semibold">ORDER NOW</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default OrderPage;
