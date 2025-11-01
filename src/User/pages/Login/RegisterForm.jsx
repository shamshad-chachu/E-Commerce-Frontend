import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../Context/StoreContext';

const RegisterForm = ({ switchToLogin }) => {
    // Destructure the Register function from context
    const { Register } = useContext(StoreContext);
    
    // State to manage form data
    const [data, setData] = useState({
        username: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: ""
    });

    // Handle input changes
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault(); 

        // Basic validation check
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare data payload
        const registerData = {
            username: data.username,
            email: data.email,
            password: data.password,
            mobileNumber: data.mobileNumber
        };

        try {
            // Call the Register function from context
            const result = await Register(registerData);
            
            if (result && result.success) {
                alert("Registration successful! Please login.");
                switchToLogin(); // Automatically switch to the login form
            } else {
                // Display error message from the backend or a default message
                alert(result.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration. Check console for details.");
        }
    };


    return (
        <form onSubmit={onSubmitHandler} className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Account</h2>
            
            {/* Username */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                    name="username" 
                    type="text" 
                    placeholder="Enter username"
                    onChange={onChangeHandler} 
                    value={data.username} 
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                    name="email"
                    type="email" 
                    placeholder="Enter email"
                    onChange={onChangeHandler}
                    value={data.email}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            {/* Mobile Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input 
                    name="mobileNumber"
                    type="tel" 
                    placeholder="Enter mobile number"
                    onChange={onChangeHandler}
                    value={data.mobileNumber}
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

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input 
                    name="confirmPassword"
                    type="password" 
                    placeholder="Confirm password"
                    onChange={onChangeHandler}
                    value={data.confirmPassword}
                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            {/* Register Button */}
            <button 
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
                Register
            </button>

            {/* Switch to Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account? 
                <button 
                    type="button" 
                    onClick={switchToLogin} 
                    className="text-indigo-600 font-semibold hover:text-indigo-700 ml-1"
                >
                    Login
                </button>
            </p>
        </form>
    )
}

export default RegisterForm;