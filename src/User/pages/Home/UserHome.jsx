// src/UserHome.jsx (UPDATED)

import React, { useContext,useEffect } from 'react'
import Navebar from '../../components/Navabar/Navebar'
import { Route, Routes } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { StoreContext } from '../../../Context/StoreContext'
import Cart from '../cart/Cart'
import LoginRegister from '../Login/LoginRegister' // Existing User forms
import Orders from '../Order/Orders'
import UserRoleSelection from '../Login/UserRoleSelection' // <--- NEW IMPORT
import AdminLogin from '../Login/AdminLogin' // <--- NEW IMPORT

const UserHome = () => {
  const {getAllProd} = useContext(StoreContext)
  useEffect(()=>{
    getAllProd()
  },[])
  return (
    <div>
      <Navebar/>
      <Routes>
        <Route path='/' element={<Header/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        
        {/* 🚀 UPDATED ROUTING STRUCTURE */}
        <Route path='/Login' element={<UserRoleSelection/>}/> {/* NEW: Role Selection */}
        <Route path='/Login/user' element={<LoginRegister/>}/> {/* EXISTING: User Login/Register */}
        <Route path='/Login/admin' element={<AdminLogin/>}/>   {/* NEW: Admin Login Placeholder */}

        <Route path='/orders' element={<Orders/>}/>
      </Routes>

    </div>
  )
}

export default UserHome;