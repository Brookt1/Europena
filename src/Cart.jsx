import Header from "./Header";
import Footer from "./Footer";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";
import { useContext, useState, useEffect } from "react";
import CartItem from "./CartItem"

function Cart() {
  const { cart, getCart, loading, error } = useContext(ShopContext);
  const [product, setProduct] = useState([]);
  const productId = useParams().productId;
  const BASE_URL = 'https://furnitureapi-ykrq.onrender.com/api/cart';



//   const fetchData = async () => { 
//     console.log("Fetching data from:", BASE_URL);
//     try {
//         const response = await fetch(BASE_URL);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProduct(data);
//     } catch (err) {
//         console.error("Error fetching data:", err);
//     }
// };

const fetchCart = async () => {
  try {
    const data = await getCart();
    setProduct(data);
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

  useEffect(() => {
    // fetchData();
    fetchCart();
}, []);


const quantityChange = async (itemId, newQuantity) => {
  try {
    const response = await fetch(`${BASE_URL}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update quantity: ${response.statusText}`);
    }

    // Optimistically update the UI
    setProduct((prevProduct) =>
      prevProduct.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    console.log("Quantity updated successfully");
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
};


const removeItem = async (itemId) => {
  try {
    const response = await fetch(`${BASE_URL}/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to remove item: ${response.statusText}`);
    }

    // Optimistically update the UI
    fetchCart();

    console.log("Removed item successfully");
  } catch (err) {
    console.error("Error removing item:", err);
  }
};




  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No Producst in Cart</p>;
  return (
    <>
      <section className="mt-4">
        <h1 className="text-3xl text-left px-6 font-extralight">
          Your <span className="text-green-950 font-bold">Cart</span>
        </h1>
        {product.map((item)=>
          <div className="m-4 flex flex-wrap items-center p-4 space-x-4 border-solid border-t-2 border-gray-300">
          
          {/* Product Image */}
          <div className="w-[200px]">
            <img
              src={item.furniture.images[0].url}
              alt={item.furniture.name}
              className="w-full h-auto"
            />
          </div>
  
          {/* Product Details */}
          <div className="flex-1 space-y-2 min-w-[200px]">
            <h1 className="text-2xl">{item.furniture.name}</h1>
            <p>{item.furniture.description}</p>
            <p className="text-2xl text-green-950">{item.furniture.price} ETB</p>
          </div>
  
          {/* Quantity */}
          <div className="min-w-[120px]">
            Quantity: <input type="number"
             min={1} defaultValue={item.quantity} 
             className='border max-w-10 sm:max-w-20 px-1 py-1'
             onChange={(e) =>
              quantityChange(item.id, Number(e.target.value))
            }
            ></input>
          </div>
  
          {/* Delete Button */}
            <div className="ml-auto">
              <button className="rounded-md p-2 text-white hover:bg-red-600"
              onClick={() => removeItem(item.id)}
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill=""
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </div>
        </div>
        )}
        <div className="p-6 flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartItem />
            <div className="w-full text-end">
              <Link to='/order-page'><button className="bg-green-800 p-2 mt-8 "><span className="font-semibold">PROCEED TO CHECKOUT</span></button></Link>
            </div>
          </div>
        </div>

        </section>

      
    </>
  );
}

export default Cart;
