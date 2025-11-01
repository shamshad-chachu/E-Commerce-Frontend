import React, { useContext } from 'react';
// Assuming you have a StoreContext
import { StoreContext } from '../../../Context/StoreContext'; 
import { Plus, Minus, ShoppingCart } from 'lucide-react'; // Lucide icons

const Item = ({ item,image}) => {
  // Destructure state and functions from context
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  
  // Get the current quantity of this item in the cart, default to 0
  const itemQuantity = cartItems[item.id] || 0;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      
      {/* Product Image */}
      <img src={item.image||image} alt={item.name} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        {/* Product Name */}
        <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
        
        {/* Category */}
        <p className="text-xs text-gray-500 mb-2 capitalize">Category: {item.category}</p>
        
        {/* Description/Short Blurb (Using a placeholder for 'cotte') */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Price and Cart Button */}
        <div className="flex justify-between items-center mt-4">
          
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 line-through">${(item.price * 1.2).toFixed(2)}</span>
            <span className="text-xl font-bold text-green-600">${item.price.toFixed(2)}</span>
          </div>

          {/* Dynamic Cart Button Logic */}
          {itemQuantity === 0 ? (
            // Display AddToCart button if quantity is 0
            <button
              onClick={() => addToCart(item.id)}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition duration-150"
            >
              <ShoppingCart className="w-4 h-4 mr-1"/> Add to Cart
            </button>
          ) : (
            // Display Plus/Minus controls if quantity > 0
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full shadow-inner">
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="font-semibold text-lg text-gray-800 w-6 text-center">
                {itemQuantity}
              </span>
              
              <button
                onClick={() => addToCart(item.id)}
                className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;