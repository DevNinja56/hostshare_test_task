import React, { useState } from "react";
import Layout from "@/Utils/Layout";
import Categories from "@/Components/Categories";
import dynamic from "next/dynamic";
import MapBoxMap from "@/Components/MapBox";

const ProductGrid = dynamic(() => import("../Utils/Container/product-grid"), {
  ssr: false,
});

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [locationList, setLocationList] = useState([]);
  return (
    <>
      <Categories {...{ selectedCategory, setSelectedCategory }} />
      <div className="flex ">
        <ProductGrid
          {...{ selectedCategory, setLocationList }}
          className="product-grid grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 px-5 "
        />
        <div className="min-w-[40%]">
          {locationList.length > 0 && (
            <MapBoxMap
              data={locationList}
              className="sticky top-[80px] h-[70vh] "
            />
          )}
        </div>
      </div>
    </>
  );
};

Home.Layout = Layout;
export default Home;
