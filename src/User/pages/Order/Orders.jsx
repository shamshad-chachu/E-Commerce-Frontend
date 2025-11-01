import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import Order from './Order';
import { images } from "../../../Assets/ImageMap";


const Orders = () => {
  const { getAllOrders, orderData } = useContext(StoreContext);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <div className='orders-page p-4'>
      <h2 className='text-2xl font-bold mb-6'>Your Order History</h2>
      <div className='orders-list space-y-4'>
        {/*  REVERSE: Using .slice(0).reverse() to display the newest orders first */}
        {orderData.slice(0).reverse().map((prod) => (
          // prod is the Order object
          <Order key={prod.id} order={prod} images={images} />
        ))}
      </div>
    </div>
  );
};

export default Orders;