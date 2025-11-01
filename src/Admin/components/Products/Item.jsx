import React from 'react'

const Item = ({ product,images}) => {
  const { name, category, price, sellingprice, qty, img } = product;
  
  // Use the first image in the array
  const imageSrc = img && img.length > 0 ? img[0] : null;

  return (
    <tr>
      {/* Image Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        {imageSrc ? (
          <img 
          // src={imageSrc}
          //not using img from the backend becouse not use cloud database to store it
            src={images[product.id]} 
            alt={name} 
            className="h-10 w-10 rounded object-cover" 
          />
        ) : (
          <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            No Img
          </div>
        )}
      </td>
      
      {/* Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </td>
      
      {/* Category */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{category}</div>
      </td>
      
      {/* Price (Cost) */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">${price}</div>
      </td>
      
      {/* Selling Price */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-semibold">${sellingprice}</div>
      </td>
      
      {/* Qty */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${qty > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {qty}
        </span>
      </td>

      
    </tr>
  )
}

export default Item;