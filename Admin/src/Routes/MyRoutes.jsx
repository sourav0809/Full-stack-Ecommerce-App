import React from "react";
import { Route, Routes } from "react-router-dom";
// importing components
import Orders from "../components/Orders/Orders";
import Products from "../components/Products/Products";
import Categories from "../components/Categories/Categories";
import SubCategory from "../components/SubCategory/SubCategory";
import ProductType from "../components/ProductType/ProductType";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/dashboard" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/subcategory" element={<SubCategory />} />
      <Route path="/producttypes" element={<ProductType />} />
      <Route path="/*" element={<Orders />} />
    </Routes>
  );
};

export default MyRoutes;
