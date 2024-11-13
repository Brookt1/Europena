import { createContext } from "react";
import { useState, useEffect } from "react";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {


    const BASE_URL = "https://furnitureapi-ykrq.onrender.com/api/furniture"
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <ShopContext.Provider value={Products}>
            {props.children}
        </ShopContext.Provider>
    )


}

export default ShopContextProvider;