import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';

export const ShopContext = createContext();

const BASE_URL = "https://furnitureapi-ykrq.onrender.com/api";

// Reusable fetch function
const fetchData = async (url, setter, setLoading, setError) => {
    setLoading(true);
    setError(null);
    console.log("Fetching data from:", url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data fetched:", data);
        await setter(data);
        
    } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
    } finally {
        setLoading(false);  
    }
};

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all products
    useEffect(() => {
        fetchData(`${BASE_URL}/furniture`, setProducts, setLoading, setError);
    }, []);

    // Fetch a single product by ID
    const getProductById = useCallback(async (productId) => {
        let product = null;
        await fetchData(`${BASE_URL}/furniture/${productId}`, (data) => {
            product = data;
        }, setLoading, setError);
        return product;
    }, []);

    const getCategories = useCallback(async () => {
        await fetchData(`${BASE_URL}/categories`, setCategories, setLoading, setError);
    }, []);

    const getProductsByCategory = useCallback(async (categoryId) => {
        await fetchData(`${BASE_URL}/categories/${categoryId}`, setProductsByCategory, setLoading, setError);
        console.log('from product',productsByCategory);
        console.log('I was here');
    }, []);

    const contextValue = {
        products,
        categories,
        productsByCategory,
        loading,
        error,
        getProductById,
        getCategories,
        getProductsByCategory,
    };  
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
