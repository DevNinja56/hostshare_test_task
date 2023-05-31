import React, { useEffect, useState } from "react";
import CardItem from "@/Components/CardItem";
import axios from "axios";
import { Listing } from "@/Utils/types";
import { nanoid } from "nanoid";
import ProductLoader from "@/Loader/Product";
import { useRouter } from "next/router";

enum LoadingState {
  Idle = "idle",
  Loading = "loading",
  Loaded = "loaded",
}

const ProductGrid: React.FC<{
  selectedCategory: string;
  className?: string;
  setLocationList?: (val: any) => void;
}> = ({
  selectedCategory,
  className = "product-grid grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10",
  setLocationList,
}) => {
  const [data, setData] = useState<Listing[]>([]);
  const [filteredData, setFilteredData] = useState<Listing[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.Idle
  );
  const [visibleItems, setVisibleItems] = useState<number>(8); // Number of items to render initially
  const [windowLoaded, setWindowLoaded] = useState<boolean>(false);
  const { query } = useRouter();

  useEffect(() => {
    setLoadingState(LoadingState.Loading);
    axios
      .get("/api/listing.json")
      .then((res) => {
        setData(res?.data?.data);
        setLoadingState(LoadingState.Loaded);
      })
      .catch((err) => {
        console.log(err);
        setLoadingState(LoadingState.Loaded); // Assuming an error should still transition to the "loaded" state
      });
  }, []);
  // console.log(data.map((item) => item.info.location.city));

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          (!!selectedCategory ? item.category === selectedCategory : true) &&
          (!!query.city ? item.info.location.city === query.city : true)
      )
    );
  }, [data, selectedCategory, query]);

  useEffect(() => {
    if (setLocationList) {
      const locationList = data.slice(0, visibleItems).map((item) => ({
        title: item.info.price,
        coordinates: [item.info.location.long, item.info.location.lat],
      }));
      setLocationList?.(locationList);
    }
  }, [visibleItems, data, selectedCategory]);

  useEffect(() => {
    // Add a delay to ensure the initial render finishes before showing more items
    const delay = setTimeout(() => {
      if (windowLoaded && visibleItems < filteredData.length) {
        setVisibleItems((prevItems) => prevItems + 4); // Increase the number of visible items
      }
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(delay);
  }, [windowLoaded, visibleItems, filteredData]);

  useEffect(() => {
    const handleWindowLoad = () => setWindowLoaded(true);
    window.addEventListener("load", handleWindowLoad);
    return () => window.removeEventListener("load", handleWindowLoad);
  }, []);

  return (
    <div className="container mx-auto py-5">
      <div className={`${className}`}>
        {loadingState === LoadingState.Loading && <ProductLoader />}

        {loadingState === LoadingState.Loaded &&
          filteredData
            .slice(0, visibleItems)
            .map((item) => <CardItem key={nanoid()} item={item} />)}
      </div>
      {visibleItems < filteredData.length && (
        <div className="text-center mt-4">
          <button
            className="transition-all duration-300 bg-primary hover:bg-primaryDarker text-white font-bold py-2 px-4 rounded"
            onClick={() => setVisibleItems((prevItems) => prevItems + 4)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
