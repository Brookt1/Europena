import { useParams, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import CartItem from "./CartItem"
import { ClipLoader } from "react-spinners";

function Cart() {
  const { cart, setCart, getCart, loading, error, token, handleSessionExpiry } = useContext(ShopContext);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  // const BASE_URL = "http://localhost:3000/api/cart";
  const BASE_URL = 'https://furniture-backend.biruk.tech/api/cart';

  useEffect(() => {
    getCart();
  }, []);
  

  // const fetchCart = async () => {
  //   try {
  //     const data = await getCart();
  //     setProduct(data);
  //   } catch (error) {
  //     console.error("Error fetching product:", error);
  //   }
  // };

  //   useEffect(() => {

  // }, []);


  const quantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid quantities
    
    try {
      const response = await fetch(`${BASE_URL}/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          toast.error("Session expired. Please login again.");
          handleSessionExpiry();
          navigate('/login');
          return;
        }
        throw new Error(`Failed to update quantity: ${response.statusText}`);
      }

      // Immediately update the local cart state for better UX
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      // Also refresh cart from server to ensure consistency
      await getCart();
      
      console.log("Quantity updated successfully");
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Failed to update quantity. Please try again.");
      // Revert optimistic update on error
      await getCart();
    }
  };


  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${BASE_URL}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          toast.error("Session expired. Please login again.");
          handleSessionExpiry();
          navigate('/login');
          return;
        }
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }

      // Immediately update local state
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
      
      // Also refresh from server to ensure consistency
      await getCart();
      
      toast.success("Item removed from cart successfully!");
      console.log("Removed item successfully");
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item. Please try again.");
      // Refresh cart on error to ensure consistency
      await getCart();
    }
  };


  // if (loading) return <p>Loading...</p>;
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4caf50" size={60} />
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!cart) return <p>No Producst in Cart</p>;
  return (
    <>
      <section className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-green-800 px-8 py-6">
              <h1 className="text-3xl font-light text-white">
                Your <span className="font-bold">Cart</span>
              </h1>
            </div>

            {/* Cart Content */}
            <div className="p-8">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                  <p className="text-gray-500 mb-8">Start shopping to add items to your cart</p>
                  <Link to="/shop">
                    <button className="bg-green-900 hover:bg-green-800 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-semibold">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {cart.map((item, index) => (
                      <div key={item.id} className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${index !== cart.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Product Image */}
                          <div className="w-full lg:w-48 h-48 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.furniture.images[0].url}
                              alt={item.furniture.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 space-y-3">
                            <div className="flex justify-between items-start">
                              <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                                {item.furniture.name}
                              </h2>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Remove item"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {item.furniture.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button 
                                    onClick={() => quantityChange(item.id, Math.max(1, item.quantity - 1))}
                                    className="p-2 hover:bg-gray-50 transition-colors duration-200"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                  </button>
                                  <input 
                                    type="number"
                                    min={1} 
                                    value={item.quantity}
                                    className="w-16 text-center py-2 border-none focus:outline-none"
                                    onChange={(e) => quantityChange(item.id, Number(e.target.value))}
                                  />
                                  <button 
                                    onClick={() => quantityChange(item.id, item.quantity + 1)}
                                    className="p-2 hover:bg-gray-50 transition-colors duration-200"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-2xl font-bold text-green-900">
                                  {item.furniture.price} <span className="text-lg font-medium">ETB</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                  Total: {(item.furniture.price * item.quantity).toFixed(2)} ETB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <div className="flex justify-end">
                      <div className="w-full sm:w-96">
                        <CartItem />
                        <div className="mt-6">
                          <Link to='/order-page'>
                            <button className="w-full bg-green-900 hover:bg-green-800 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                              PROCEED TO CHECKOUT
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
