import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import { ShopContext } from "./context/ShopContext";
import { ClipLoader } from "react-spinners";

function TrackOrder() {
  const { orders, getOrders, loading, error } = useContext(ShopContext);

  useEffect(() => {
    getOrders();
  }, []);
  
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4caf50" size={60} />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  
  
    
  return (
    <>
      <section className="mt-4">
        <h1 className="text-3xl px-6 font-extralight">
          MY <span className="text-green-950 font-bold">ORDERS</span>
        </h1>

        {orders.length === 0 ? (
          <h1 className="p-4 text-center">No Orders Yet</h1>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Order ID: {order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        order.status === "PENDING"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 border-t pt-4"
                    >
                      <div className="bg-gray-200 w-[100px] h-[100px] flex-shrink-0">
                        <img
                          src={item.furniture?.images?.[0]?.url || "/placeholder.jpg"}
                          alt={item.furniture.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h1 className="text-lg font-semibold">
                          {item.furniture.name}
                        </h1>
                        <p className="text-sm text-gray-700">
                          {item.furniture.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-green-950">
                        {item.price} ETB
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold">
                    Total: {order.totalAmount} ETB
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
    </>
  );
}

export default TrackOrder;
