import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react'; 
import ProdUpdate from './prodUpdate';
import { images } from "../../../Assets/ImageMap";



const EditProd = () => {
    const { Products} = useContext(StoreContext);
    useEffect(()=>{

    },[Products])

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Products Inventory</h1>
                
                <Link 
                    to="/Add" 
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-medium rounded-lg shadow-md hover:bg-sky-700 transition duration-150"
                >
                    <Plus size={20} />
                    Add New
                </Link>
            </div>

            <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    
                    {/* Table Header  */}
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
                                Price (Cost)
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Selling Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Qty
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Products.map((item) => (
                            <ProdUpdate key={item.id} item={item} images={images} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EditProd;