import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../pages/Layout";
import Shop from "../pages/Shop";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Home from "../pages";
import ProductDetails from "../pages/ProductDetails";
import Order from "../pages/Order";
import ThankYou from "../pages/ThankYou";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/order" element={<Order />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Route>
    </>
  )
);

export default router;
