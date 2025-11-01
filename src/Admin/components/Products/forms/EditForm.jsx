import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, Plus } from 'lucide-react';
import { StoreContext } from '../../../../Context/StoreContext';

// Define the standard category options
const CATEGORY_OPTIONS = [
    'Fashion',
    'Electronics',
    'Sprots Hub',
    'Beauty& Personal Care',
    'Other'
];

const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook for navigation after successful update/delete
    
    // Initialize state to null to indicate loading/no data yet
    const [formData, setFormData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {getOneProd,UpdateProd,DeleteProd} = useContext(StoreContext)

// --- Section 1: Data Fetching (Get Product Details) ---
    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                // Adjust the endpoint if necessary (e.g., /products/123)
                const response = await getOneProd(id); 
                if (!response.ok) {
                    throw new Error(`Failed to fetch product ${id}. Status: ${response.status}`);
                }
                const data = await response.json();
                
                // IMPORTANT: Ensure number fields are numbers and img is an array (add an empty string for a new input field)
                setFormData({
                    ...data,
                    price: parseFloat(data.price) || 0,
                    sellingprice: parseFloat(data.sellingprice) || 0,
                    qty: parseInt(data.qty) || 0,
                    // Ensure 'img' is an array, and append an empty string for the "add new image" field
                    img: Array.isArray(data.img) ? [...data.img, ''] : [''],
                });
            } catch (err) {
                setError(err.message);
                console.error("Fetch Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

// --- Section 2: Form Handlers ---
    
    // General handler for all fields (name, category, price, qty)
    const handleFormChange = (e) => {
        const { name, value, type } = e.target;
        
        // Type casting for number inputs
        const newValue = type === 'number' ? parseFloat(value) : value;

        setFormData(prev => ({ 
            ...prev, 
            [name]: newValue, 
        }));
    };

    // Handler for image URL fields
    const handleImageChange = (index, value) => {
        const newImg = [...formData.img];
        newImg[index] = value;
        setFormData({ ...formData, img: newImg });
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, img: [...prev.img, ''] }));
    };

    const removeImageField = (index) => {
        const newImg = formData.img.filter((_, i) => i !== index);
        setFormData({ ...formData, img: newImg });
    };

// --- Section 3: Submission & Deletion Logic (API Interaction) ---

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Prepare data: filter out empty image URL strings
    const productToUpdate = {
        ...formData,
        img: formData.img.filter(url => url.trim() !== ''), 
    };

    try {
        // 2. Call the context function with the ID and cleaned product data
        const response = await UpdateProd(id, productToUpdate);

        if (!response.ok) {
            // 3. Handle Error (reads JSON response body for error message)
            const errorData = await response.json(); 
            throw new Error(errorData.message || `Failed to update product ${id}. Status: ${response.status}`);
        }

        // 4. Handle Success
        alert(`✅ Product ${id} updated successfully!`);
        navigate('/EditProducts/*'); 

    } catch (err) {
        console.error("Update Error:", err);
        alert(`Error updating product: ${err.message}`);
    }
};
    // Function to handle the product deletion (DELETE)
    const handleDelete = async () => {
        if (!window.confirm(`Are you absolutely sure you want to delete Product ${formData.name} (ID: ${id})? This action cannot be undone.`)) {
            return;
        }

        try {
            // Use the context function instead of a hardcoded fetch call
            const response = await DeleteProd(id); 
    
            if (!response.ok) {
                // Note: DELETE responses often have no body, so check status before assuming JSON body
                // If Spring Boot returns a plain error message, this could fail. 
                // For DELETE, checking response.ok is often sufficient.
                throw new Error(`Failed to delete product ${id}. Status: ${response.status}`);
            }
            alert(`✅ Product ${id} deleted successfully!`);
            navigate('/EditProducts/*'); 

        } catch (err) {
           console.log(err);
        }
    };

// --- Section 4: Render Logic ---

    if (isLoading) {
        return <div className="p-4 max-w-4xl mx-auto text-center text-lg mt-10">Loading product details...</div>;
    }

    if (error) {
        return <div className="p-4 max-w-4xl mx-auto text-center text-red-600 text-lg mt-10">Error: {error}</div>;
    }

    // Since formData is null-checked, we can safely use it here.
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Edit Product (ID: {id})
            </h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                
                {/* Product Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input 
                            type="text"
                            name="name" 
                            id="name" 
                            value={formData.name || ''} // Use empty string fallback for controlled inputs
                            onChange={handleFormChange} 
                            required 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" 
                        />
                    </div>
                    
                    {/* Category Select Tag */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category || ''}
                            onChange={handleFormChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 bg-white appearance-none cursor-pointer"
                        >
                            <option value="" disabled>Select a category</option>
                            {CATEGORY_OPTIONS.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price, Selling Price, and Quantity Inputs */}
                    {['price', 'sellingprice', 'qty'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1).replace('price', ' Price').replace('qty', ' Quantity')}
                            </label>
                            <input 
                                type="number" 
                                name={field} 
                                id={field} 
                                // Ensure value is a number for controlled number inputs
                                value={formData[field]} 
                                onChange={handleFormChange} 
                                required 
                                min="0"
                                step={field !== 'qty' ? "0.01" : "1"} // Allow decimals for price, integers for quantity
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" 
                            />
                        </div>
                    ))}
                </div>

                {/* Image URL Fields (Multiple Inputs) */}
                <h2 className="text-xl font-semibold mb-3 border-t pt-4">Image URLs</h2>
                {formData.img.map((url, index) => (
                    <div key={index} className="flex gap-3 mb-3 items-center">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder={`Image URL/Path #${index + 1}`}
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {/* Don't show the remove button for the last, empty field (the "add new" slot) */}
                        {index < formData.img.length - 1 || url.trim() !== '' ? ( 
                            <button 
                                type="button"
                                onClick={() => removeImageField(index)}
                                className="text-red-500 hover:text-red-700 p-2"
                            >
                                <Trash2 size={20} />
                            </button>
                        ) : null}
                    </div>
                ))}
                
                {/* Only show the 'Add Another Image' button if the last input field is NOT empty */}
                {formData.img[formData.img.length - 1].trim() !== '' && (
                    <button
                        type="button"
                        onClick={addImageField}
                        className="flex items-center gap-1 px-3 py-2 text-sm text-sky-600 border border-sky-600 rounded-md hover:bg-sky-50 transition duration-150 mb-8"
                    >
                        <Plus size={16} /> Add Another Image
                    </button>
                )}


                {/* Action Buttons */}
                <div className="flex justify-between border-t pt-6">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700"
                    >
                        Delete Product
                    </button>
                    
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;