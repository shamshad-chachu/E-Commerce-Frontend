// src/components/Orders/Orders.jsx (UPDATED)

import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import Order from './Order';
import { images } from "../../../Assets/ImageMap";


const Orders = () => {
  const { getAllOrders, orderData } = useContext(StoreContext);

  useEffect(() => {
    // 💡 FIX: Call the function and include it in the dependency array
    getAllOrders();
  }, [getAllOrders]);

  return (
    <div className='orders-page p-4'>
      <h2 className='text-2xl font-bold mb-6'>Your Order History</h2>
      <div className='orders-list space-y-4'>
        {/* 💡 REVERSE: Use .slice(0).reverse() to display the newest orders first */}
        {orderData.slice(0).reverse().map((prod) => (
          // prod here is actually the Order object
          <Order key={prod.id} order={prod} images={images} />
        ))}
      </div>
    </div>
  );
};

export default Orders;