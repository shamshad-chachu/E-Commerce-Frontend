import React, { useContext, useState } from 'react';
import RegisterForm from './RegisterForm';
import Loginform from './Loginform';
import { LogIn, UserPlus, LogOut } from 'lucide-react'; // Icons
import { StoreContext } from '../../../Context/StoreContext'; // Import StoreContext

const LoginRegister = () => {
    // 1. Get userData and Logout function from context
    const { userData, Logout } = useContext(StoreContext); 
    
    // State to toggle between Login (true) and Register (false)
    const [isLoggdIn, setIsLoggdIn] = useState(true); 

    // Function to handle logout (optional, as Logout() from context is often enough)
    const handleLogout = () => {
        Logout();
    };

    // 2. Conditional Rendering Logic: If userData exists, show the Logout screen
    if (userData) {
        return (
            <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 text-center space-y-6">
                    <h2 className="text-3xl font-bold text-green-600">🎉 Login Successful!</h2>
                    <p className="text-gray-700 text-lg">
                        Welcome back, <strong className="text-indigo-600">{userData.username}</strong>.
                    </p>
                    <p className="text-sm text-gray-500">
                        You are already logged in with email: {userData.email}
                    </p>
                    
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center"
                    >
                        <LogOut className="w-5 h-5 inline mr-2" /> Logout
                    </button>
                    
                </div>
            </div>
        );
    }
    
    // 3. Default Rendering Logic: If userData does NOT exist, show Login/Register forms
    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                
                {/* Toggle Buttons */}
                <div className="flex border-b mb-6">
                    <button
                        onClick={() => setIsLoggdIn(true)}
                        className={`flex-1 py-3 text-lg font-semibold transition duration-300 ${
                            isLoggdIn 
                                ? 'text-indigo-600 border-b-4 border-indigo-600' 
                                : 'text-gray-500 hover:text-indigo-500'
                        }`}
                    >
                        <LogIn className="w-5 h-5 inline mr-2" /> Login
                    </button>
                    <button
                        onClick={() => setIsLoggdIn(false)}
                        className={`flex-1 py-3 text-lg font-semibold transition duration-300 ${
                            !isLoggdIn 
                                ? 'text-indigo-600 border-b-4 border-indigo-600' 
                                : 'text-gray-500 hover:text-indigo-500'
                        }`}
                    >
                        <UserPlus className="w-5 h-5 inline mr-2" /> Register
                    </button>
                </div>

                {/* Dynamic Form Display */}
                {isLoggdIn ? (
                    <Loginform switchToRegister={() => setIsLoggdIn(false)} />
                ) : (
                    <RegisterForm switchToLogin={() => setIsLoggdIn(true)} />
                )}
            </div>
        </div>
    );
}

export default LoginRegister;