import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Client from "./routes/Client";
import Login from "./routes/Client/Login";
import ProductCatalog from "./routes/Client/ProductCatalog";
import ProductDetails from "./routes/Client/ProductDetails";
import Cart from "./routes/Client/Cart";

import { useState } from 'react';
import { ContextCartCount } from "./utils/ContextCart";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/Home";

export default function App() {

  const [contextCartCount, setContextCartCount] = useState<number>(0);

  return (
    <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Client />} >
            <Route index element={<ProductCatalog />} />
            <Route path="product-catalog" element={<ProductCatalog />} />
            <Route path="product-details/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/admin/" element={<Admin />}>
            <Route index element={<AdminHome />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ContextCartCount.Provider>
  );
}