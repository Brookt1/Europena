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
import MyProfile from "./MyProfile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header.jsx";
import SearchBar from "./SearchBar.jsx";
import About from "./About.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";

function Layout() {
  return (
    <>
      <Header />
      <SearchBar />
      <div className="h-[110px]"></div>
      <Outlet /> {/* This renders the current route's element */}
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [ // Nested routes
        { path: '', element: <Home /> },
        { path: '/shop', element: <Shop /> },
        { path: 'product/:productId', element: <ProductDetail /> },
        { path: '/cart/:productId', element: <Cart /> },
        { path: '/order-page', element: <OrderPage /> },
        { path: '/orders', element: <TrackOrder /> },
        { path: '/login', element: <Login /> },
        { path: '/about', element: <About /> },
        { path: '/profile', element: <MyProfile /> },
      ],
    },
  ],
  );

  return (
    <>
      <ShopContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ShopContextProvider>
    </>
  );
}

export default App;
