import React, { useState, useContext } from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const AdminLoginComponent = () => { 
    const { AdminLogin } = useContext(StoreContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try {
            // Call the AdminLogin context function
            const result = await AdminLogin(formData);

            if (result && result.success) {
                alert("Admin Login successful! Redirecting to dashboard...");
                
                navigate('/Products');
            } else {
                alert(result.error || "Admin Login failed. Invalid credentials.");
            }
        } catch (error) {
            console.error("Admin Login submission error:", error);
            alert("An unexpected error occurred during login.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 text-center space-y-4">
                <h2 className="text-3xl font-bold text-teal-600">Admin Portal Login</h2>
                <p className="text-gray-600">Please enter your administrative credentials.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4 pt-4"> 
                    
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Admin Email" 
                        required 
                        onChange={onChangeHandler}
                        value={formData.email}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
                    />
                    
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        required 
                        onChange={onChangeHandler}
                        value={formData.password}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" 
                    />
                    
                    <button type="submit" 
                            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200">
                        Login as Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginComponent; 