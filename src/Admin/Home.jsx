import React, { useContext, useEffect, useState } from "react";
import Product from "./components/Products/Product";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import EditProd from "./components/Products/EditProd";
import EditForm from "./components/Products/forms/EditForm";
import AddItemForm from "./components/Products/forms/AddItemForm";
import { StoreContext } from "../Context/StoreContext";
import Orders from "./components/Ordes/Orders";


const Home = () => {
  // State to track if the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {getAllProd} = useContext(StoreContext);
  useEffect(()=>{ getAllProd()},[])
  return (
    // Use a regular div or flex layout for the container
    <div className="flex min-h-screen">
      
      {/* Sidebar - Pass the state and setter */}
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto p-4 transition-all duration-300`}>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/Products" element={<Product />} />
          {/* <Route path="/Products/AddEdit" element={<EditProd/>} /> */}
          <Route path="/EditProducts/*" element={<EditProd />} />
          <Route path="/Orders" element={<Orders/>} />
          <Route path="/Edit/:id" element={<EditForm/>}/>
          <Route path="/Add" element={<AddItemForm/>}/>

          
        </Routes>
      </div>
    </div>
  );
};

export default Home;