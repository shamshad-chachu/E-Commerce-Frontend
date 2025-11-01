import React from 'react';
import { Link } from 'react-router-dom';
import { User, Shield } from 'lucide-react';

const UserRoleSelection = () => {
    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-10 text-center space-y-8">
                
                <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-4">Select Your Role to Sign In</h2>
                
                <div className="flex justify-around space-x-6">
                    
                    {/* User/Customer Option */}
                    <Link
                        to="/Login/user" // Route for User Login/Register
                        className="flex-1 p-6 border-4 border-indigo-200 rounded-xl hover:shadow-lg transition duration-300 transform hover:scale-105 bg-indigo-50"
                    >
                        <User className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                        <span className="block text-xl font-bold text-indigo-700">Customer</span>
                        <span className="block text-sm text-gray-500">Shop & Track Orders</span>
                    </Link>

                    {/*  Admin Option */}
                    <Link
                        to="/Login/admin" // Route for Admin Login
                        className="flex-1 p-6 border-4 border-teal-200 rounded-xl hover:shadow-lg transition duration-300 transform hover:scale-105 bg-teal-50"
                    >
                        <Shield className="w-12 h-12 text-teal-600 mx-auto mb-3" />
                        <span className="block text-xl font-bold text-teal-700">Admin</span>
                        <span className="block text-sm text-gray-500">Manage Products & Users</span>
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default UserRoleSelection;