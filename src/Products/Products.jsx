import { useEffect, useState } from "react";
import Product from "./Product";
import { IoChevronBack, IoChevronForward, IoSearch } from "react-icons/io5";

const Products = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [filterBrand, setFilterBrand] = useState("");
  const [PriceRange, setPriceRange] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sorting, setSorting] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchResults, setSearchResults] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:5000/products?brand_name=${filterBrand}&category_name=${filterCategory}&sorting=${sorting}&price=${PriceRange}&page=${currentPage}&limit=10&search=${searchResults}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      });
  }, [filterBrand, filterCategory, PriceRange, currentPage, sorting , searchResults]);

  const handleBrandName = (e) => {
    setFilterBrand(e.target.value);
    setCurrentPage(1);
  };
  const handleCategory = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };
  const handlePriceRange = (e) => {
    setPriceRange(e.target.value);
    setCurrentPage(1);
  };
  const handleSorting = (e) => {
    setSorting(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    //e.preventDefault();
    setSearchResults(e.target.value);
    //console.log(e.value);
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-10 space-x-4 bg-white text-center rounded-lg shadow-md">
        <div className="relative flex-grow max-w-xs">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
            <IoSearch className="text-lg" />
          </div>
        </div>
        <div>
          <select
            onChange={handleBrandName}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Brand</option>
            <option>Apple</option>
            <option>Google</option>
            <option>Samsung</option>
            <option>Xiaomi</option>
            <option>Sony</option>
            <option>Huawei</option>
            <option>LG</option>
            <option>OnePlus</option>
            <option>Oppo</option>
            <option>Realme</option>
            <option>Nokia</option>
          </select>
        </div>
        <div>
          <select
            onChange={handleCategory}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option>Smartphone</option>
            <option>Button Phone</option>
            <option>Tablet</option>
          </select>
        </div>
        <div>
          <select
            onChange={handlePriceRange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Price Range</option>
            <option>0-100</option>
            <option>101-300</option>
            <option>301-500</option>
            <option>501-700</option>
            <option>701-900</option>
            <option>901-1100</option>
            <option>1101-1300</option>
            <option>1301-1500</option>
          </select>
        </div>
        <div>
          <select
            onChange={handleSorting}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Sorting</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Latest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allProduct.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>

      <div className="flex justify-center mt-6 items-center text-lg my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage <= 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white`}
        >
          <IoChevronBack className="text-xl" />
        </button>
        <span className="mx-4 text-blue-500 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white`}
        >
          <IoChevronForward className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Products;
