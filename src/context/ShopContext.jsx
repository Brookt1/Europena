import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const BASE_URL = "https://furnitureapi-ykrq.onrender.com/api";

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

    const [cart,setCart] = useState([]);
    const [cartSize, setCartSize] = useState();

    // Reusable fetch function
    const fetchData = useCallback( async (url, setter) => {
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

    const getCart =useCallback( async () => {
        let cart = null 
        await fetchData(`${BASE_URL}/cart`, (data)=>{
            cart = data;
            setCart(data);
            setCartSize(cart.length);
        });
        return cart
    }, [fetchData]);

    // Fetch all products
    useEffect(() => {
        fetchData(`${BASE_URL}/furniture`, setProducts);
        getCart();
    }, [fetchData, setProducts, getCart]);

    // Store token

    useEffect(()=> {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    })

    // Fetch a single product by ID
    const getProductById = useCallback(async (productId) => {
        let product = null;
        await fetchData(`${BASE_URL}/furniture/${productId}`, (data) => {
            product = data;
        });
        return product;
    }, [fetchData]);

    const getCategories = useCallback(async () => {
        await fetchData(`${BASE_URL}/categories`, setCategories);
    }, [fetchData]);

    const getProductsByCategory = useCallback(async (categoryId) => {
        await fetchData(`${BASE_URL}/categories/${categoryId}`, setCategoryProducts);
    }, [fetchData]);


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
                setToken,
                getProductById,
                getCategories,
                getProductsByCategory,
                getCart,
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