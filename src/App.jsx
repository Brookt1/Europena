import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import Shop from "./Shop.jsx";
import ProductDetail from "./ProductDetail.jsx"
import NotFound from "./NotFound.jsx";
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
    }
  ]);

  return (
    <>
    
    <RouterProvider router={router} />
    
    </>
  );
}

export default App;
