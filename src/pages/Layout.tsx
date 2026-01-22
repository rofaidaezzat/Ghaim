import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Watsapp from "../Components/Watsapp/Watsapp";
import ScrollToTop from "../Components/ScrollToTop";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <div className="fixed bottom-10 right-10 z-50">
        <Watsapp />
      </div>
    </div>
  );
};

export default Layout;
