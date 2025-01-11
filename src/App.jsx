import { RouterProvider, createBrowserRouter , createRoutesFromElements , Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import Layout from "./Components/Layout";
import SignIn from "./pages/SignIn";
import AddListing from "./pages/AddListing";
import Order from "./pages/Order";
import Details from "./pages/Details"
import ViewOrderDetails from "./pages/OrderDetails";

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<SignIn/>}></Route>
      <Route path="/addListing" element={<AddListing/>}></Route>
      <Route path="/order" element={<Order/>}></Route>
      <Route path="/book/:bookid" element={<Details/>}></Route>
      <Route path="/books/orders/:bookid" element={<ViewOrderDetails/>}></Route>
    </Route>
    </>
  )
)

function App() {
  return(
    <>
      <div className="flex flex-col min-h-screen">
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App