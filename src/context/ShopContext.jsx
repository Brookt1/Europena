import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const BASE_URL = "https://furnitureapi-ykrq.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const [cart, setCart] = useState([]);
  const [cartSize, setCartSize] = useState();

  const [orders, setOrders] = useState([]);

  const deliveryFee = 200;
  
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)


  // Reusable fetch function
  const fetchData = useCallback(async (url, setter) => {
    setLoading(true);
    setError(null);
    console.log("Fetching data from:", url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setter(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCart = useCallback(async () => {
    let cart = null;
    await fetchData(`${BASE_URL}/cart`, (data) => {
      cart = data;
      setCart(data);
      setCartSize(cart.length);
    });
    return cart;
  }, [fetchData]);

  // Fetch all products
  useEffect(() => {
    fetchData(`${BASE_URL}/furniture`, setProducts);
    getCart();
  }, [fetchData, setProducts, getCart]);

  // Store token

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  });

  // Fetch a single product by ID
  const getProductById = useCallback(
    async (productId) => {
      let product = null;
      await fetchData(`${BASE_URL}/furniture/${productId}`, (data) => {
        product = data;
      });
      return product;
    },
    [fetchData]
  );

  const getCategories = useCallback(async () => {
    await fetchData(`${BASE_URL}/categories`, setCategories);
  }, [fetchData]);

  const getProductsByCategory = useCallback(
    async (categoryId) => {
      await fetchData(
        `${BASE_URL}/categories/${categoryId}`,
        setCategoryProducts
      );
    },
    [fetchData]
  );


  const checkout = async (formData) => {
    const orderData = {
      user: formData,
      items: cart,
      totalAmount: cart.reduce(
        (sum, item) => sum + item.furniture.price * item.quantity,
        0
      ) + deliveryFee ,
    };

    try {
      // Post to backend
      const response = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to process order");
      }

      // Update orders and clear cart
      setOrders((prevOrders) => [...prevOrders, orderData]);
      setCart([]);
      toast.success("Order placed successfully!");
      navigate('/orders')
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };



  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        categoryProducts,
        cart,
        cartSize,
        loading,
        error,
        token,
        deliveryFee,
        search, showSearch, BASE_URL,
        setSearch, setShowSearch,
        setToken,
        getProductById,
        getCategories,
        getProductsByCategory,
        getCart, setCart,
        checkout,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
