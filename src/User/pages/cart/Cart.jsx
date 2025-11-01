import React, { useContext } from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import { Plus, Minus, X } from 'lucide-react'; // Icons for controls
import { images } from "../../../Assets/ImageMap";


const Cart = () => {
    // orderdItems properly destructured
    const { Products, cartItems, addToCart, removeFromCart, orderdItems, userData } = useContext(StoreContext);

    
    const getProductById = (id) => {
        return Products.find(product => product.id === id);
    };

    const getItemTotal = (product, quantity) => {
        return product ? product.sellingprice * quantity : 0;
    };

    const getCartTotal = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const product = getProductById(parseInt(itemId));
                if (product) {
                    total += getItemTotal(product, quantity);
                }
            }
        }
        return total;
    };

    const cartProducts = Object.keys(cartItems)
        .filter(itemId => cartItems[itemId] > 0)
        .map(itemId => {
            const product = getProductById(parseInt(itemId));
            return product ? { ...product, quantity: cartItems[itemId] } : null;
        })
        .filter(item => item !== null);

    // --- Constants for Totals ---
    const subtotal = getCartTotal();
    const discount = 0;
    const deliveryFee = 0;
    const finalTotal = subtotal - discount + deliveryFee;

    // --- Order Handler 
    const HandelOrder = async () => { 
        
        // 1. Authorization Check
        if (!userData || !userData.userId) {
            alert("Please login to proceed with your order.");
            return; 
        }

        // 2. Prepare the order data for the backend
        const orderData = {
            userId: userData.userId, 
            username: userData.username, 
            orderDate: new Date().toISOString(), 
    
            cart: cartProducts.map(item => ({
                productId: item.id,
                name: item.name,
                category: item.category,
                price: item.sellingprice, 
                qty: item.quantity,
                lineTotal: getItemTotal(item, item.quantity).toFixed(2) 
            })),
            
            totalAmount: finalTotal.toFixed(2),
        };

        try {
            // Passing the formatted orderData to the context function
            const result = await orderdItems(orderData);
            
            if (result && result.orderId) { 
                alert(`Order successfully placed! Order ID: ${result.orderId}`);
            } else {
                alert("Order failed to submit. Please try again.");
            }

        } catch (error) {
            console.error("Error during order submission:", error);
            alert(`An error occurred while placing the order: ${error.message}`);
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-xl rounded-lg mt-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-3">
                Shopping Cart ({cartProducts.length} Items)
            </h1>

            {cartProducts.length === 0 ? (
                // ... (Empty cart message) ...
                <div className="text-center py-10">
                    <p className="text-xl text-gray-600">Your cart is empty. Time to start shopping!</p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    <div className="lg:w-2/3 space-y-4">
                        {cartProducts.map((item) => (
                            <div 
                                key={item.id} 
                                className="flex items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300"
                            >
                                {/* Item Image */}
                                <img 
                                    // src={item.img ? item.img[0] : images[item.id]}  //the image is not hosted in cloude so using dummy images
                                    src={images[item.id]}
                                    alt={item.name} 
                                    className="w-16 h-16 object-cover rounded-md mr-4 border" 
                                />
                                
                                {/* Item Details */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-semibold text-gray-900 truncate">{item.name}</p>
                                    <p className="text-sm text-gray-500 capitalize">Category: {item.category}</p>
                                    <p className="text-base text-green-600 font-medium">Selling Price: ${item.sellingprice.toFixed(2)}</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center mx-4 space-x-2">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 p-1 rounded-full hover:bg-red-100 transition"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    
                                    <span className="font-bold text-lg text-gray-800 w-6 text-center">
                                        {item.quantity}
                                    </span>
                                    
                                    <button
                                        onClick={() => addToCart(item.id)}
                                        className="text-green-500 p-1 rounded-full hover:bg-green-100 transition"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                {/* Total for Product in Row */}
                                <div className="ml-auto text-right w-24">
                                    <p className="text-xl font-bold text-indigo-600">
                                        ${getItemTotal(item, item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                
                                {/* Remove Button */}
                                <button
                                    onClick={() => {
                                        for (let i = 0; i < item.quantity; i++) {
                                            removeFromCart(item.id);
                                        }
                                    }}
                                    className="ml-4 text-gray-400 hover:text-red-500 transition"
                                    aria-label="Remove item completely"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT SIDE: Order Summary*/}
                    <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-inner sticky top-4 h-fit">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h3>
                        
                        <div className="space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span>Discount:</span>
                                <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span>Delivery Fee:</span>
                                <span className="font-semibold text-green-600">FREE</span>
                            </div>
                        </div>

                        <div className="border-t pt-4 mt-4 flex justify-between items-center text-lg font-bold text-gray-900">
                            <span>Order Total:</span>
                            <span className="text-2xl text-indigo-600">${finalTotal.toFixed(2)}</span>
                        </div>

                        {/* Checkout button conditionally disabled if not logged in */}
                        <button
                            onClick={HandelOrder}
                            disabled={!userData} // Disable if userData is null
                            className={`w-full mt-6 py-3 rounded-lg text-xl font-semibold transition duration-200 shadow-md ${
                                userData 
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            }`}
                        >
                            {userData ? 'Proceed to Payment' : 'Log in to Checkout'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;