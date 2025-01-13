import Header from "./Header"
import Footer from "./Footer"
import { useContext, useState, useEffect } from "react"
import {ShopContext} from "./context/ShopContext"
import { ClipLoader } from "react-spinners";
function TrackOrder(){

    const { orders, loading, error, fetchOrders } = useContext(ShopContext);
    const [product, setProduct] = useState([]);
    

    

    // const fetchCart = async () => {
    //     try {
    //       const data = await getCart();
    //       setProduct(data);
    //     } catch (error) {
    //       console.error("Error fetching product:", error);
    //     }
    //   };
      
    //     useEffect(() => {
          
    //       fetchCart();
    //   }, []);

    // if (loading) return <p>Loading...</p>;
    if (loading)
      return (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#4caf50" size={60} />
        </div>
      );
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>No Producst in Cart</p>;
    console.log("orders: ", orders)

    return(
        <>
        
      <section className="mt-4">
        <h1 className="text-3xl text-left px-6 font-extralight">
          MY <span className="text-green-950 font-bold">ORDERS</span>
        </h1>
        {orders.length === 0 ? <h1 className="p-4">No Orders Yet</h1> : 
        orders.map((item)=>
          <div className="m-4 flex items-center p-4 space-x-4 border-solid border-t-2 border-gray-300">
          {/* Product Image */}
          <div className="bg-gray-200 w-[200px]">
            <img
              src={item.furniture.images[0].url}
              alt={item.furniture.name}
              className="w-full h-auto"
            />
          </div>
  
          {/* Product Details */}
          <div className="flex-1 space-y-2 min-w-[200px]">
            <h1 className="text-2xl">{item.furniture.name}</h1>
            <p className="text-2xl text-green-950">{item.furniture.price} ETB</p>
            <p>Quantity: {item.quantity}</p>
          </div>
  
          {/* Status */}
          <div className="min-w-[120px] flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
            <p>Ready to deliver</p>
          </div>
        </div>
        )}
        </section>

      

        </>
    )
}

export default TrackOrder;