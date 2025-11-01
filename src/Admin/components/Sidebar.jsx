// src/Admin/components/Sidebar.jsx (UPDATED)

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import { StoreContext } from "../../../Context/StoreContext"; // Import context
import { StoreContext } from "../../Context/StoreContext";
// Import all necessary icons from lucide-react
import { 
    Menu, 
    X, 
    LayoutDashboard, 
    Boxes, 
    PencilLine, 
    Package,
    LogOut // <--- NEW ICON: Logout
} from 'lucide-react'; 

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
    // Access Logout function from context
    const { Logout } = useContext(StoreContext);
    const navigate = useNavigate();

    // Function to handle link click, closing the menu on mobile
    const handleLinkClick = () => {
        // Tailwind's 'md' breakpoint is typically 768px
        if (window.innerWidth < 768) { 
            setIsMenuOpen(false);
        }
    };
    
    // 💡 NEW: Admin Logout Handler
    const handleLogout = () => {
        Logout(); // Execute the context's logout function

        // navigate(''); // Redirect to the general Login selection page
        handleLinkClick(); // Close the sidebar (especially on mobile)
    };

    return (
        <>
            <div 
                className={`
                    flex flex-col bg-sky-800 h-screen text-white shadow-xl z-20 
                    transition-all duration-300 ease-in-out
                    ${isMenuOpen ? 'w-64' : 'w-20'} 
                    sm:w-20 md:w-64 md:sticky md:top-0
                `}
            >
                
                {/* Toggle Button and Title (Header Section) */}
                <div className="flex items-center justify-center p-4">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 md:hidden" 
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <h2 className={`text-2xl font-bold ${isMenuOpen ? 'block' : 'hidden'} md:block`}>Admin Panel</h2>
                </div>

                {/* Navigation Links (Main Section) */}
                <nav className="flex flex-col gap-2 mt-4 grow"> {/* Add flex-grow here */}
                    
                    {/* Dashboard Link */}
                    <Link 
                        to="/" 
                        onClick={handleLinkClick}
                        className="flex items-center p-3 hover:bg-sky-700 transition duration-150 group"
                    >
                        <LayoutDashboard size={24} /> 
                        <span className={`ml-4 ${isMenuOpen ? 'block' : 'hidden'} md:block group-hover:block`}>
                            Dashboard
                        </span>
                    </Link>
                    
                    {/* Products List Link */}
                    <Link 
                        to="/Products" 
                        onClick={handleLinkClick}
                        className="flex items-center p-3 hover:bg-sky-700 transition duration-150 group"
                    >
                        <Boxes size={24} />
                        <span className={`ml-4 ${isMenuOpen ? 'block' : 'hidden'} md:block group-hover:block`}>
                            Products List
                        </span>
                    </Link>

                    {/* Add/Edit Products Link */}
                    <Link 
                        to="/EditProducts/*"
                        onClick={handleLinkClick}
                        className="flex items-center p-3 hover:bg-sky-700 transition duration-150 group"
                    >
                        <PencilLine size={24} />
                        <span className={`ml-4 ${isMenuOpen ? 'block' : 'hidden'} md:block group-hover:block`}>
                            Add/Edit Products
                        </span>
                    </Link>

                    {/* Orders Link */}
                    <Link 
                        to="/Orders" 
                        onClick={handleLinkClick}
                        className="flex items-center p-3 hover:bg-sky-700 transition duration-150 group"
                    >
                        <Package size={24} />
                        <span className={`ml-4 ${isMenuOpen ? 'block' : 'hidden'} md:block group-hover:block`}>
                            Orders
                        </span>
                    </Link>
                    
                </nav>
                
                {/* --- Admin Logout Button (Footer Section) --- */}
                <div className="mt-auto p-4 border-t border-sky-700">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center p-3 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700 transition duration-150 group"
                    >
                        <LogOut size={24} />
                        <span className={`ml-4 ${isMenuOpen ? 'block' : 'hidden'} md:block group-hover:block`}>
                            Logout
                        </span>
                    </button>
                </div>
            </div>
            
            {/* Overlay for Mobile */}
            {isMenuOpen && (
                <div 
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
                />
            )}
        </>
    );
};

export default Sidebar;