import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../Context/StoreContext';

const Loginform = ({ switchToRegister }) => {
    const { Login } = useContext(StoreContext);

    // State updated to use 'email' instead of 'mobileNumber'
    const [data, setData] = useState({
        username: "",
        email: "", // <-- CHANGED
        password: ""
    });

    // Handle input changes (still works, as it uses event.target.name)
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Data sent to backend now includes 'email'
        const loginData = {
            email: data.email, // <-- CHANGED
            password: data.password,
            username: data.username,
            // Note: We typically don't need to send username for login if we search by email.
            // But we can leave it in the model for flexibility.
        };

        try {
            const result = await Login(loginData);
            
            if (result && result.success) {
                alert("Login successful!");
                // Handle redirection/token saving here
            } else {
                alert(result.error || "Login failed. Invalid credentials or network error.");
            }
        } catch (error) {
            console.error("Login submission error:", error);
            alert("An error occurred during login.");
        }
    };


    return (
        <form onSubmit={onSubmitHandler} className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
            
            {/* Username (Optional for Login, but kept if you want to use it) */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                    name="username" 
                    type="text" 
                    placeholder="Enter username"
                    onChange={onChangeHandler} 
                    value={data.username} 
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    // Required status can be optional if you rely solely on email/password
                />
            </div>

            {/* Email Input (Replaces Mobile Number) */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                    name="email" // <-- CHANGED: Input name is 'email'
                    type="email" // <-- CHANGED: Type is 'email'
                    placeholder="Enter your email"
                    onChange={onChangeHandler} 
                    value={data.email} 
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Enter password"
                    onChange={onChangeHandler} 
                    value={data.password} 
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            
            {/* Login Button */}
            <button 
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
                Login
            </button>

            {/* Switch to Register Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account? 
                <button 
                    type="button" 
                    onClick={switchToRegister} 
                    className="text-indigo-600 font-semibold hover:text-indigo-700 ml-1"
                >
                    Register here
                </button>
            </p>
        </form>
    )
}

export default Loginform;