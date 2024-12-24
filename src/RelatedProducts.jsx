import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./context/ShopContext";
import ShopItemCard from "./ShopItemCard";
import { Link } from "react-router-dom";

const RelatedProduct = ({category}) => {
    const {products} = useContext(ShopContext)
    const [related, setRelated] = useState([]);
    
    useEffect(()=>{
        if (products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> category === item.categoryId)
            setRelated (productsCopy);
        }
    },[category])

    return(
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <h1 className="font-thin"><span className="font-bold text-green-950">Related</span> Products</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item, index) =>(
                    <Link key={index} to={`/product/${item.id}`}>
                    <ShopItemCard 
                    image={item.images[0]?.url || "/default-image.jpg"}
                    name = {item.name}
                    price={item.price}
                    />
                    </Link>
                ))}
            </div>
        </div>
    )

}

export default RelatedProduct