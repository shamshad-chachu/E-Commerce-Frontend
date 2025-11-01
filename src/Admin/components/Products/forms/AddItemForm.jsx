import React, { useContext, useState } from 'react';
import { Plus, Trash2, Image } from 'lucide-react'; 
import {StoreContext} from '../../../../Context/StoreContext'
// Define the initial state for a new product
const initialFormState = {
    name: '',
    category: '', 
    price: '',
    sellingprice: '',
    qty: '',
    imgFiles: [null, null, null], 
};

// standard category options
const CATEGORY_OPTIONS = [
    'Fashion',
    'Electronics',
    'Sprots Hub',
    'Beauty& Personal Care',
    'Other'
];

const AddItemForm = () => {
    
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState('');
    const [submittedData, setSubmittedData] = useState(null);
    const {AddProd} = useContext(StoreContext)
    // ---  Form Handling ---

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            // Keep numerical fields as strings/numbers based on input
            [name]: ['price', 'sellingprice', 'qty'].includes(name) ? (value === '' ? '' : Number(value)) : value,
        }));
    };

    // --- File Array Handling ---

    const handleImageChange = (index, file) => {
        const newImgFiles = [...formData.imgFiles];
        newImgFiles[index] = file;
        setFormData({ ...formData, imgFiles: newImgFiles });
    };

    const addImageField = () => {
        // Add a new field represented by null (no file selected yet)
        setFormData({ ...formData, imgFiles: [...formData.imgFiles, null] });
    };

    const removeImageField = (index) => {
        // Ensure there are always at least three image fields
        if (formData.imgFiles.length <= 3) {
            alert("Minimum 3 image fields required.");
            return;
        }
        const newImgFiles = formData.imgFiles.filter((_, i) => i !== index);
        setFormData({ ...formData, imgFiles: newImgFiles });
    };

    // --- Submission Handler ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // Get the actual File objects
        const selectedFiles = formData.imgFiles.filter(file => file !== null);
        
        // Basic validation
        if (!formData.name || !formData.category || formData.price === '' || formData.sellingprice === '' || formData.qty === '' || selectedFiles.length < 3) {
            setMessage(`Error: Please fill in all required fields and select a minimum of 3 images. You currently have ${selectedFiles.length} selected.`);
            return;
        }

        // Prepare the non-file product data payload
        const productPayload = {
            name: formData.name,
            category: formData.category,
            // Convert numbers immediately before sending
            price: Number(formData.price),
            sellingprice: Number(formData.sellingprice),
            qty: Number(formData.qty),
        };

        // Call the context function, passing the product payload AND the raw files
        setMessage('Uploading files and adding product...');
        
        // Pass the payload AND the raw File objects
        const apiResponse = await AddProd(productPayload, selectedFiles); 

        //  Handle the response
        if (apiResponse.success) {
            
            setSubmittedData(apiResponse.data);
            setMessage(`Success! Product "${productPayload.name}" added to database with ID: ${apiResponse.data.id}`);
            setFormData(initialFormState); // Reset form on success
        } else {
            setMessage(`API Error: Failed to add product. ${apiResponse.error}`);
        }
    };

    
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h1>

            {/* Display Messages */}
            {message && (
                <div className={`p-3 mb-4 rounded-md ${message.startsWith('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                
                {/* Text and Number Fields  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>

                    {/* Category Select Tag */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
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
                                value={formData[field]}
                                onChange={handleChange}
                                required
                                min="0"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                    ))}
                </div>

                {/* --- File Upload Fields --- */}
                <h2 className="text-xl font-semibold mb-3 border-t pt-4 flex items-center gap-2">
                    <Image size={24} className="text-sky-600"/> Product Images (Min. 3 Files)
                </h2>
                {formData.imgFiles.map((file, index) => (
                    <div key={index} className="flex gap-3 mb-3 items-center">
                        <label className="block w-full">
                            <span className="sr-only">Choose file for image {index + 1}</span>
                            <input
                                
                                type="file" 
                                onChange={(e) => handleImageChange(index, e.target.files[0] || null)}
                                accept="image/*" // Only allow image files
                                // require file input if it is one of the first three fields and no file is selected
                                required={index < 3 && file === null} 
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-sky-50 file:text-sky-700
                                    hover:file:bg-sky-100"
                            />
                            {/* Display selected file name for user feedback */}
                            {file && <p className="text-xs text-green-600 mt-1 truncate">{file.name}</p>}
                            {!file && index < 3 && <p className="text-xs text-red-500 mt-1">Required Image</p>}
                        </label>
                        
                        {/* Allow removal only if there are more than 3 fields */}
                        {formData.imgFiles.length > 3 && (
                            <button 
                                type="button"
                                onClick={() => removeImageField(index)}
                                className="text-red-500 hover:text-red-700 p-2"
                                title="Remove Image Field"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>
                ))}
                
                {/* Button to add a new file field */}
                <button
                    type="button"
                    onClick={addImageField}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-sky-600 border border-sky-600 rounded-md hover:bg-sky-50 transition duration-150 mb-8"
                >
                    <Plus size={16} /> Add Another Image Field
                </button>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                        Upload & Add Product Data (Files Captured Locally)
                    </button>
                </div>
            </form>

            {/* --- Display Submitted Data (Optional Debugging) --- */}
            {submittedData && (
                <div className="mt-8 p-4 bg-gray-50 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Last Submitted Data Structure:</h3>
                    <pre className="text-xs overflow-x-auto p-2 bg-white rounded">
                        {JSON.stringify(submittedData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default AddItemForm;