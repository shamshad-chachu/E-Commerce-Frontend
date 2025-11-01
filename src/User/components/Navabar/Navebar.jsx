import React from "react";
import { Link } from "react-router-dom";
// Import Lucide icons, including Search
import { Home, ShoppingCart, User, ScrollText, Search } from 'lucide-react'; 

const Navebar = () => {
  // Array of navigation links (excluding the search bar for now)
  const navLinks = [
    { to: "/", text: "Home", Icon: Home },
    { to: "/orders", text: "Orders", Icon: ScrollText }, 
    { to: "/Cart", text: "Cart", Icon: ShoppingCart }, 
    { to: "/Login", text: "Sign in", Icon: User }, 
  ];

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand/Logo */}
        <h3 className="text-xl font-bold text-white">Shopping</h3>

        {/* Navigation Links and Search Bar Container */}
        <div className="flex items-center space-x-6">
          
          {/* 🔍 Search Input Field */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="py-1 pl-10 pr-4 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 bg-amber-50 focus:ring-indigo-500 w-64"
            />
            {/* Search Icon inside the input field */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
          
          {/* Main Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.text}
              to={link.to}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
            >
              {/* Lucide Icon component */}
              <link.Icon className="w-5 h-5 mr-1" />
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navebar;