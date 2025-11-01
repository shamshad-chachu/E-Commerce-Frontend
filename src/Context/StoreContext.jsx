import React, { createContext, useState, useEffect, useCallback } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // --- AUTH STATE & PERSISTENCE ---
  const [token, setToken] = useState(null); // Used to determine if a user is logged in
  const [userData, setUserData] = useState(null); // Stores username, email, userId etc.
  const [orderData,setOrderData] = useState([])
  const [isAdmin,SetIsAdmin]  = useState(false)
  const BASE_URL = "http://localhost:8082"; // Define base URL once

  // --- STATE MANAGEMENT ---
  const [Products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // --- API FUNCTIONS (Products, Cart, Order, Auth) ---

  // READ: Get All Products (Logic remains the same)
  const getAllProd = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/Product/`); // Use BASE_URL
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
        console.log("Products fetched successfully:", data);
      } else {
        console.error("Failed to fetch products:", response.status, data);
      }
    } catch (error) {
      console.error("Network error during getAllProd:", error);
    }
  }, []); //dependency array means this function is stable

  // CREATE: Add Product (kept as a standalone utility function for clean code)
  const AddProd = async (prodData, rawFiles) => {
    const formData = new FormData();
    formData.append("name", prodData.name);
    formData.append("category", prodData.category);
    formData.append("price", prodData.price);
    formData.append("sellingprice", prodData.sellingprice);
    formData.append("qty", prodData.qty);

    rawFiles.forEach((file) => {
      if (file) {
        formData.append("imgFiles", file);
      }
    });

    try {
      const response = await fetch("http://localhost:8082/Product/AddProduct", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}. Body: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Product added successfully:", result);

      // CRITICAL: Update product list after a successful addition
      // You might need to update the logic here if your backend doesn't return the full list
      // For now, let's just trigger a full refresh:
      getAllProd();

      return { success: true, data: result };
    } catch (error) {
      console.error("Fetch/API error during product add:", error.message);
      return { success: false, error: error.message };
    }
  };

  // READ: Get One Product
  const getOneProd = async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/Product/${id}`);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch single product.");
    }
  };

  // UPDATE: Update Product
  const UpdateProd = async (id, prod) => {
    try {
      const response = await fetch(
        `http://localhost:8082/Product/Update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...prod, id: parseInt(id) }),
        }
      );

      if (response.ok) {
        // Update local state after successful update
        getAllProd();
      }

      return response;
    } catch (error) {
      console.error("Network/Fetch error during update:", error);
      throw new Error("Could not connect to the server for update.");
    }
  };

  // DELETE: Delete Product
  const DeleteProd = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8082/Product/Delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update local state by removing the deleted item
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      }

      return response;
    } catch (error) {
      console.error("Network/Fetch error during deletion:", error);
      throw new Error("Could not connect to the server for deletion.");
    }
  };

  // --- CART LOGIC (Logic remains the same) ---
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newQuantity = (prev[itemId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [itemId]: removedItem, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: newQuantity,
      };
    });
  };

  // --- ORDER FUNCTION (UPDATED) ---
  // The items parameter will now receive the orderData object from Cart.jsx
  const orderdItems = async (orderData) => {
    // Placeholder for your backend Order/Checkout endpoint
    console.log(orderData);
    const ORDER_API_URL = "http://localhost:8082/Order/PlaceOrder";

    try {
      const response = await fetch(ORDER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set header for JSON body
        },
        // Use JSON.stringify to send the JavaScript object as a JSON string
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error in ordering:", response.status, errorBody);
        throw new Error(`Order failed with status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order placed successfully:", result);

      // OPTIONAL: Clear the cart after successful order
      setCartItems({});

      return result; // Return the backend response
    } catch (error) {
      console.error("Network or API error during order placement:", error);
      throw error; // Re-throw the error for the component to handle
    }
  };

  const Login = async (data) => {
    const LOGIN_API_URL = `${BASE_URL}/User/Login`;
    console.log(data);
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        console.error("Login failed:", response.status, result);
        return { success: false, error: result.message || "Login failed" };
      }

      // **SUCCESSFUL LOGIN HANDLING**
      if (result.success) {
        // Assuming the backend returns 'token', 'username', and 'email'
        const { username, email, userId /* , token: receivedToken */ } = result;

        // 1. Store state (Use a placeholder 'dummy-token' if the backend doesn't return one yet)
        const receivedToken = "dummy-token-123";
        setToken(receivedToken);
        setUserData({ username, email, userId });

        // 2. Store in Local Storage for persistence
        localStorage.setItem("token", receivedToken);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);

        // 💡 Consider storing userId in localStorage too for quick access
        if (userId) localStorage.setItem("userId", userId);

        console.log("Login successful, user data stored.");
        return { success: true, data: result };
      }
    } catch (error) {
      console.error("Network or API error during login:", error);
      return { success: false, error: error.message };
    }
  };

  const Register = async (data) => {
    const REGISTER_API_URL = `${BASE_URL}/User/Register`;
    try {
      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        console.error("Registration failed:", response.status, result);
        return {
          success: false,
          error: result.message || "Registration failed",
        };
      }

      console.log("Registration successful:", result);
      return { success: true, data: result };
    } catch (error) {
      console.error("Network or API error during registration:", error);
      return { success: false, error: error.message };
    }
  };

  const Logout = () => {
    // Clear state
    setToken(null);
    setUserData(null);
    SetIsAdmin(false)

    // Clear Local Storage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    console.log("User logged out. Storage cleared.");
  };


    // ----  GETTING ALL THE ORDERS FROM BACKEND ---
    const getAllOrders =async()=>{
        try {
            // Note: Your backend endpoint is currently unprotected (no token sent)
            const response = await fetch("http://localhost:8082/Order/") 
            if(!response.ok){
                console.log(response);
            }
            const data = await response.json()
            setOrderData([...data]) // Successfully setting state
        } catch (error) {
            console.log(error);
        }
    }

    //---ADMIN LOGIN ---
     
    const AdminLogin = async(data)=>{
      const ADMIN_LOGIN_API_URL = `${BASE_URL}/Admin/Login`; // Use BASE_URL
      console.log("Attempting Admin Login with:", data);

      try {
          const response = await fetch(ADMIN_LOGIN_API_URL, {
              method:"POST",
              headers: { "Content-Type": "application/json" }, // CRITICAL: Add Content-Type
              body: JSON.stringify(data) // CRITICAL: Use JSON.stringify
          });

          const result = await response.json();

          if (!response.ok || result.success === false) {
              console.error("Admin Login failed:", response.status, result);
              return { success: false, error: result.message || "Admin login failed" };
          }

          // **SUCCESSFUL ADMIN LOGIN HANDLING**
          if (result.success) {
              // You would typically receive an admin-specific token and data here.
              const { username, email, adminId } = result;
              const adminToken = "admin-token-123"; // Replace with real token

              // 1. Store state (Crucial for UI changes)
              setToken(adminToken);
              setUserData({ username, email, userId: adminId, role: 'ADMIN' });
              SetIsAdmin(true); // Set the admin flag

              // 2. Store in Local Storage for persistence
              localStorage.setItem("token", adminToken);
              localStorage.setItem("username", username);
              localStorage.setItem("email", email);
              localStorage.setItem("isAdmin", "true"); // Store admin status
              
              console.log("Admin Login successful, state stored.");
              return { success: true, data: result };
          }
      } catch (error) {
          console.error("Network or API error during Admin Login:", error);
          return { success: false, error: error.message };
      }
    }


  // ... (Initial useEffect updated to restore isAdmin status) ...
useEffect(() => {
  // 1. Fetch initial product data
  getAllProd();

  // 2. Check for persisted login data
  const storedToken = localStorage.getItem("token");
  const storedUsername = localStorage.getItem("username");
  const storedEmail = localStorage.getItem("email");
  const storedIsAdmin = localStorage.getItem("isAdmin"); // <--- NEW

  if (storedToken && storedUsername) {
      setToken(storedToken);
      setUserData({ username: storedUsername, email: storedEmail });
      // Restore isAdmin state
      if (storedIsAdmin === "true") { 
          SetIsAdmin(true); 
      }
      console.log("User session restored from local storage.");
  }
}, [getAllProd]);

  // --- CONTEXT VALUE ---
  const contextValue = {
    //ADMIN
    isAdmin,
    AdminLogin,

    // Product Data & Management
    Products,
    getAllProd,
    AddProd,
    getOneProd,
    UpdateProd,
    DeleteProd,

    // Cart State & Functions
    cartItems,
    addToCart,
    removeFromCart,
    orderdItems,

    // Auth
    token,
    userData,
    Login,
    Register,
    Logout,

    // ORDERS
    getAllOrders,
    orderData,


  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
