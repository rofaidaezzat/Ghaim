import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import logo from "../assets/photo_2026-01-22_22-17-04.jpg";
import ImageWithFallback from "./ImageWithFallback";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-primary/90">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              {/* Use text logo if image doesn't look good on dark bg, or tint it. 
                   Assuming the logo is the one from Navbar. Ideally should have a white version.
                   For now, let's use text or a container for the logo. */}
              <div className="bg-white p-1 rounded-full">
                <ImageWithFallback
                  src={logo}
                  alt="Ghaim Logo"
                  className="h-10 w-10 object-contain rounded-full"
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                GHAIM
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Elegance is not standing out, but being remembered. Discover
              timeless fashion that expresses your unique style.
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-primary/80 p-2.5 rounded-full hover:bg-secondary hover:text-primary text-gray-400 transition-all duration-300 hover:-translate-y-1"
                  aria-label="Social Link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Shop Collection", path: "/shop" },
                { name: "About Us", path: "/about-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-secondary transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-secondary me-0 group-hover:me-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">
              Customer Care
            </h3>
            <ul className="space-y-3">
              {[
                { name: "My Cart", path: "/order" },
                { name: "Contact Us", path: "/contact-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-secondary transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-secondary me-0 group-hover:me-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider text-sm">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href={`mailto:ahmed.mohamed77.abdalla@gmail.com`}
                  className="hover:text-white transition-colors"
                >
                  ahmed.mohamed77.abdalla@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href={`tel:01070067386`}
                  className="hover:text-white transition-colors"
                  dir="ltr"
                >
                  01070067386
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/80 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 FZ DESIGNER. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
