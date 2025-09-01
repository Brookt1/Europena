import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axiosInstance from '../axiosInstance';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  // const BASE_URL = "http://localhost:3000/api";
  const BASE_URL = "https://furniture-backend.biruk.tech/api";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [cart, setCart] = useState([]);
  const [cartSize, setCartSize] = useState(0);

  const [orders, setOrders] = useState([]);

  const deliveryFee = 200;

  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)



  // Reusable fetch function
  // const fetchData = useCallback(async (url, setter) => {
  //   setLoading(true);
  //   setError(null);
  //   console.log("Fetching data from:", url);
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setter(data);
  //   } catch (err) {
  //     setError(err.message);
  //     console.error("Error fetching data:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // New fetchData using axiosInstance
  const fetchData = useCallback(async (url, setter, options = {}) => {
    setLoading(true);
    setError(null);
    console.log("Fetching data from:", url);
    try {
      const response = await axiosInstance({
        url,
        method: options.method || 'get',
        headers: options.headers,
        data: options.body,
      });
      setter(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);


  // const getCart = useCallback(async () => {
  //   let cart = null;
  //   await fetchData(`${BASE_URL}/cart`, (data) => {
  //     cart = data;
  //     setCart(data);
  //     setCartSize(cart.length);
  //   });
  //   return cart;
  // }, [fetchData]);

  const getCart = useCallback(async () => {
    let cart = null;
    await fetchData(`${BASE_URL}/cart`, (data) => {
      cart = data;
      setCart(data);
      setCartSize(getCartSize(data));
    });
    return cart;
  }, [fetchData]);

  const getCartSize = (cartData = cart) => {
    let count = 0;

    try {
      for (const item of cartData) {
        if (item.quantity > 0) {
          count += item.quantity;
        }
      }
    } catch (error) {
      console.error("Error calculating cart size:", error);
    }

    return count;
  };


  useEffect(() => {
    const size = getCartSize();
    setCartSize(size);
    console.log("Cart size updated:", size);
    console.log("cart", cart)
  }, [cart]);

  const getOrders = useCallback(async () => {
    let order = null;
    await fetchData(`${BASE_URL}/order`, (data) => {
      order = data;
      setOrders(data);
    });
    return order;
  }, [fetchData]);

  // useEffect(()=> {
  //   fetchOrders
  // },[fetchData]);

  // Fetch all products
  useEffect(() => {
    fetchData(`${BASE_URL}/furniture`, setProducts);
    // getCart();
    // getOrders();
  }, [fetchData, setProducts]);

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
        `${BASE_URL}/categories/subcategory/${categoryId}`,
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
      ) + deliveryFee,
    };

    try {
      // Post to backend
      console.log(orderData)
      await axiosInstance.post(`${BASE_URL}/order`, orderData);
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

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUsername('')
    setUserEmail('')
    setCart([])
    setCartSize(0)
    toast.info("You have been logged out.")
  }

  const addToCart = async (furnitureId, quantity = 1) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return false;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/cart", {
        furnitureId: furnitureId,
        quantity: quantity,
      });

      if (response.status === 200 || response.status === 201) {
        await getCart();
        toast.success("Item added to cart successfully!");
        return true;
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      if (error.response?.status === 401) {
        handleSessionExpiry();
      } else if (error.response?.status === 409) {
        toast.warning("Item already exists in cart!");
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }

  const handleSessionExpiry = () => {
    logout();
  }



  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        categoryProducts, selectedCategory,
        cart,
        cartSize, orders,
        loading,
        error,
        token,
        deliveryFee,
        search, showSearch, BASE_URL,
        username, userEmail,
        setSearch, setShowSearch,
        setToken,
        getProductById,
        getCategories, setSelectedCategory,
        getProductsByCategory, setCategoryProducts,
        getCart, setCart, getCartSize, getOrders,
        checkout, addToCart,
        setUsername,
        setUserEmail, logout, handleSessionExpiry,
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
