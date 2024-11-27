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

    // Fetch all products
    useEffect(() => {
        fetchData(`${BASE_URL}/furniture`, setProducts);
    }, [fetchData]);

    // Fetch a single product by ID
    const getProductById = useCallback(async (productId) => {
        let product = null;
        await fetchData(`${BASE_URL}/furniture/${productId}`, (data) => {
            product = data;
        });
        return product;
    }, [fetchData]);

    const getCategories = async () => {
        await fetchData(`${BASE_URL}/categories`, setCategories);
    };

    const getCategoryProducts = async (categoryId) => {
        await fetchData(`${BASE_URL}/categories/${categoryId}`, setCategoryProducts);
    };

    return (
        <ShopContext.Provider
            value={{
                products,
                categories,
                categoryProducts,
                loading,
                error,
                getProductById,
                getCategories,
                getCategoryProducts,
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
