import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Home.jsx";
import Shop from "./Shop.jsx";
import ProductDetail from "./ProductDetail.jsx";
import Cart from "./Cart.jsx";
import NotFound from "./NotFound.jsx";
import OrderPage from "./OrderPage.jsx";
import TrackOrder from "./TrackOrder.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header.jsx";
import SearchBar from "./SearchBar.jsx";

function Layout() {
  return (
    <>
      <Header />
      <SearchBar />
      <Outlet /> {/* This renders the current route's element */}
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />, // Wrap all routes with the Layout
      errorElement: <NotFound />,
      children: [ // Nested routes
        { path: '', element: <Home /> },
        { path: '/shop', element: <Shop /> },
        { path: 'product/:productId', element: <ProductDetail /> },
        { path: '/cart/:productId', element: <Cart /> },
        { path: '/order-page', element: <OrderPage /> },
        { path: '/orders', element: <TrackOrder /> },
        { path: '/login', element: <Login /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
