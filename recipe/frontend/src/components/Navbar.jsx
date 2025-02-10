import React from "react";
import { Link, NavLink } from "react-router-dom"; // ✅ Import NavLink
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="bg-orange-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-white text-2xl font-bold">
            <span className="text-orange-200">W</span>
            <span className="text-red-200">e</span>
            <span className="text-green-200">lcome</span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          className="flex space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <li>
            <NavLinkItem to="/our-api">Our API</NavLinkItem>
          </li>
          <li>
            <NavLinkItem to="/form">Form</NavLinkItem>
          </li>
          <li>
            <NavLinkItem to="/contact">Contact</NavLinkItem>
          </li>
          <li>
            <NavLinkItem to="/developers">Meet Our Developers</NavLinkItem>
          </li>
        </motion.ul>
      </div>
    </nav>
  );
};

// ✅ Fixed NavLinkItem Component
const NavLinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-white transition-colors duration-200 ${
        isActive ? "text-green-200 font-bold" : "hover:text-green-200"
      }`
    }
  >
    <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.span>
  </NavLink>
);

export default Navbar;
