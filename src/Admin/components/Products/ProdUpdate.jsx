import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react'; // Import the pencil icon
import { ImageMap} from '../../../Assets/ImageMap';


const ProdUpdate = ({ item,images}) => {
    // Destructure the properties, including the new 'img' array
    const { id, name, category, price, sellingprice, qty, img } = item;
    
    // Get the source for the first image
    // const imageSrc = img && img.length > 0 ? item.img[1] : null;

    // 1. Get the path string from the context (e.g., 'src/Assets/menu_5.png')
    const imagePathString = img && img.length > 0 ? item.img[0] : null;
    // 2. Resolve the path string to the actual imported asset using the ImageMap
    const imageSrc = imagePathString ? ImageMap[imagePathString] : null;
    
    
    // Define the path for editing
    const editPath = '/EditProducts/Form'; 

    return (
        <tr>
            {/* Image Column (NEW) */}
            <td className="px-6 py-3 whitespace-nowrap">
                {imageSrc ?(
                    <img 
                        // src={imageSrc}
                        src={images[id]}
                        alt={name} 
                        className="h-10 w-10 rounded object-cover" 
                    />
                ) : (
                    <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        <img src={images[id]} alt="images" />
                    </div>
                )}
            </td>

            {/* Name */}
            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{name}</td>
            
            {/* Category */}
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{category}</td>
            
            {/* Price (Cost) */}
            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">${price}</td>
            
            {/* Selling Price */}
            <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-700">${sellingprice}</td>
            
            {/* Qty */}
            <td className="px-6 py-3 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${qty > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {qty}
                </span>
            </td>

            {/* Edit Icon */}
            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                <Link 
                    to={`/Edit/${id}`}
                    className="text-sky-600 hover:text-sky-800 transition duration-150"
                    title={`Edit ${name}`}
                >
                    <Pencil size={18} />
                </Link>
            </td>
        </tr>
    );
};

export default ProdUpdate;