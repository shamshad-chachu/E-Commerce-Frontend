import React, { useContext, useState, useMemo } from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import Item from './Item';
import { images } from "../../../Assets/ImageMap";


const Product = () => {
  const { Products } = useContext(StoreContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(Products.map(p => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [Products]);

  const filteredProducts = useMemo(() => {
    return Products.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [Products, searchTerm, selectedCategory]);

  return (
    <div className="p-4">
      <h2 className="text-xl sm:text-3xl font-bold mb-6 text-gray-800">Products List</h2>

      {/* Search and Filter Controls: Stack vertically on small screens */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        
        {/* Search Input: Takes full width on small screens */}
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 w-full md:flex-1"
        />

        {/* Category Filter Dropdown: Takes full width on small screens */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg bg-white appearance-none cursor-pointer w-full md:w-64"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Selling
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <Item key={product.id} product={product} images={images} />
            ))}
            {filteredProducts.length === 0 && (
                <tr>
                    <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        No products match your search/filter criteria.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;