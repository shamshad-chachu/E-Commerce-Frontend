import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import Item from './Item';
import { Filter } from 'lucide-react'; 
import { images } from "../../../Assets/ImageMap";


//  the category options 
const CATEGORY_OPTIONS = [
    'Fashion',
    'Electronics',
    'Sprots Hub',
    'Beauty& Personal Care',
    'Other'
];

const Products = () => {
    // Get products from context
    const { Products } = useContext(StoreContext);
    const [category, setCategory] = useState("All"); 

    // Filter the products based on the selected category
    const filteredProducts = Products.filter(item => 
        category === "All" || item.category === category
    );

    // Handler for the select tag change
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Our Collection</h2>

            {/* Filtering Options with Select Tag */}
            <div className="flex gap-3 mb-8 items-center border-b pb-4">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <label htmlFor="category-filter" className="font-medium text-gray-700">Filter By:</label>
                
                <select
                    id="category-filter"
                    value={category}
                    onChange={handleCategoryChange}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium transition duration-150 ease-in-out"
                >
                    {/* Add "All" option manually */}
                    <option value="All">All Categories</option> 
                    
                    {/* Map through the defined categories */}
                    {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <Item key={item.id} item={item} image={images[item.id]||images[0]} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center">
                        No products found in the **{category}** category.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Products;