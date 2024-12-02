import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import Shop from "./Shop.jsx";
import ProductDetail from "./ProductDetail.jsx"
import Cart from "./Cart.jsx"
import NotFound from "./NotFound.jsx";
import OrderPage from "./OrderPage.jsx";
import TrackOrder from "./TrackOrder.jsx";
function App() {

  const router = createBrowserRouter([
    {
      path: '',
      element: <Home />,
      errorElement: <NotFound />
    },
    {
      path: '/shop',
      element: <Shop />
    },
    {
      path: 'product/:productId',
      element: <ProductDetail />
    },
    {
      path: '/cart/:productId',
      element: <Cart />
    },
    {
      path: '/order-page',
      element: <OrderPage />
    },
    {
      path: '/orders',
      element: <TrackOrder />
    }
  ]);

  return (
    <>
    
    <RouterProvider router={router} />
    
    </>
  );
}

export default App;
