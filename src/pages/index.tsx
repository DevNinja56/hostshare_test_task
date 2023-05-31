import React, { useState } from "react";
import Layout from "@/Utils/Layout";

import Categories from "@/Components/Categories";
import dynamic from "next/dynamic";
import ProductLoader from "@/Loader/Product";

const ProductGrid = dynamic(() => import("../Utils/Container/product-grid"), {
  ssr: false,
});

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  return (
    <>
      <Categories {...{ selectedCategory, setSelectedCategory }} />
      <ProductGrid {...{ selectedCategory }} />
    </>
  );
};

Home.Layout = Layout;
export default Home;
