import React, { useContext } from "react";
import { ShopContext } from "./context/ShopContext";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  return showSearch ? (
    <div className="w-full mt-[110px] mb-[-110px]"> {/* Adjust top as needed */}
      <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-300 shadow-md px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
            type="text"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26px"
            viewBox="0 -960 960 960"
            width="26px"
            fill="#4B5563"
            className="ml-2"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>
        <svg
          onClick={() => setShowSearch(false)}
          className="inline cursor-pointer transition-colors"
          xmlns="http://www.w3.org/2000/svg"
          height="26px"
          viewBox="0 -960 960 960"
          width="26px"
          fill="#6B7280"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>
      {showSearch && search && (
        <div className="mt-3 p-4 text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Showing results for "<span className="text-green-800">{search}</span>"
          </h1>
        </div>
      )}
    </div>
  ) : null;
};

export default SearchBar;
