import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import logo from "../assets/photo_2026-01-22_22-17-04.jpg";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import CartDrawer from "./CartDrawer";
import ImageWithFallback from "./ImageWithFallback";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const cartCount = safeCartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 font-sans">
      <div className="container mx-auto px-6 py-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <ImageWithFallback
              src={logo}
              alt="Fashon Logo"
              className="h-24 w-24 rounded-none object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-[0.15em] transition-colors duration-300 uppercase relative group py-1 ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-primary hover:text-primary/80"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 start-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    isActive(link.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions (Cart & Language) */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group p-2 hover:bg-secondary/20 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-primary group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group p-2 hover:bg-secondary/20 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-primary hover:bg-secondary/20 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-down bg-white rounded-2xl p-4 border border-gray-50 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-secondary/20 text-primary"
                    : "text-gray-600 hover:bg-secondary/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
