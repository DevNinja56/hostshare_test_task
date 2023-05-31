import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import HeaderSeachMenu from "./HeaderSearchMenu";

const HeaderSearch = () => {
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const hadleToggleSearch = () => {
    setSearchMenuOpen((prev) => !prev);
  };

  const handleSearchClose = () => {
    setSearchMenuOpen(false);
  };

  return (
    <div className="">
      <div>
        {searchMenuOpen && (
          <HeaderSeachMenu onClickSearch={() => setSearchMenuOpen(false)} />
        )}
        <div
          className={`absolute w-[100vw] h-[100vh] bg-[#00000094] top-0 left-0 z-[-1] transition-opacity duration-300 ${
            searchMenuOpen
              ? "max-h-screen max-w-full opacity-[1]"
              : "max-h-0 max-w-0 opacity-0"
          }`}
          onClick={handleSearchClose}
        ></div>
      </div>

      <div
        className={` ${
          !searchMenuOpen
            ? "max-h-screen max-w-full opacity-100 transition-opacity duration-300"
            : "max-h-0 max-w-0 opacity-0"
        }`}
      >
        <div
          className="search-input flex justify-center items-center border-2 rounded-full py-2 px-4 text-sm hover:shadow-md transition-all duration-700 ease-in-out cursor-pointer"
          onClick={hadleToggleSearch}
        >
          <div className="">
            <button className="font-semibold px-4 border-r-2">Anywhere</button>
          </div>
          <div className="">
            <button className="font-semibold px-4 border-r-2">Any Week</button>
          </div>
          <div className="">
            <button className="flex items-center">
              <span className="inline-block  font-light px-4">Add guest</span>
              <span className="bg-primary inline-block p-1.5 rounded-full ">
                <FaSearch className="text-white" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
