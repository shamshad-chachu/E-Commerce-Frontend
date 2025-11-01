// src/components/Orders/Order.jsx (UPDATED)

import React from 'react';
import moment from 'moment'; // 💡 Suggestion: Use 'moment' or date-fns for easy date formatting

const Order = ({ order,images}) => {
  // Use a default image if the product doesn't have an image field yet
  const PLACEHOLDER_IMG = "https://via.placeholder.com/60?text=Product";

  return (
    <div className='order-card border p-4 rounded-lg shadow-md bg-white'>
      {/* --- Main Order Summary Row --- */}
      <div className='order-header flex justify-between items-center border-b pb-3 mb-3'>
        <h3 className='font-semibold text-lg text-indigo-700'>
          Order ID: #{order.id}
        </h3>
        <div className='text-sm flex space-x-4'>
          <p>
            <span className='font-medium'>Date:</span>{' '}
            {/* Format the date for readability */}
            {moment(order.orderDate).format('YYYY-MM-DD h:mm A')}
          </p>
          <p>
            <span className='font-medium'>Status:</span>{' '}
            <span className={`px-2 py-0.5 rounded text-white text-xs ${order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-yellow-500'}`}>
              {order.status}
            </span>
          </p>
          <p className='font-bold text-xl text-green-600'>
            Total: ₹{parseFloat(order.totalAmount).toFixed(2)}
          </p>
        </div>
      </div>

      {/* --- Individual Order Items (Cart) --- */}
      <div className='order-items space-y-3'>
        {order.cart.map((item, index) => (
          <div key={index} className='item-row flex items-center justify-between border-b last:border-b-0 py-2'>
            <div className='flex items-center space-x-4'>
              {/* Product Image (Placeholder) */}
              <img
                // src={PLACEHOLDER_IMG}
                src={images[order.id]} 
                alt={item.name}
                className='w-14 h-14 object-cover rounded-md'
              />
              
              {/* Product Details (Key-Value Pair) */}
              <div>
                <p className='font-semibold text-gray-800'>{item.name}</p>
                <p className='text-sm text-gray-500'>Category: {item.category}</p>
                <p className='text-sm text-gray-500'>Product ID: {item.productId}</p>
              </div>
            </div>

            {/* Price and Quantity */}
            <div className='flex space-x-6 text-right'>
              <p>
                <span className='font-medium text-gray-600'>Qty:</span>{' '}
                <span className='font-bold'>{item.qty}</span>
              </p>
              <p>
                <span className='font-medium text-gray-600'>Price:</span>{' '}
                ₹{parseFloat(item.price).toFixed(2)}
              </p>
              <p className='font-bold text-lg text-blue-600'>
                Total: ₹{parseFloat(item.lineTotal).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;