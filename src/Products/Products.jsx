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

  useEffect(() => {
    fetch(
      `http://localhost:5000/products?brand_name=${filterBrand}&category_name=${filterCategory}&sorting=${sorting}&price=${PriceRange}&page=${currentPage}&limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      });
  }, [filterBrand, filterCategory, PriceRange, currentPage, sorting]);

  const handlebrandName = (e) => {
    setFilterBrand(e.target.value);
    setCurrentPage(1);
  };
  const handleCategory = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };
  const handlepricerange = (e) => {
    setPriceRange(e.target.value);
    setCurrentPage(1);
  };
  const handlesroting = (e) => {
    setSorting(e.target.value);
    setCurrentPage(1);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProduct = allProduct.filter((product) => {
    return (product.Product_Name?.toLowerCase() || "").includes(
      searchQuery.toLowerCase()
    );
  });

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
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
                    <IoSearch className="text-lg" />
                </div>
            </div>
            <div>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="">Select Brand</option>
                    <option value="brand1">Brand 1</option>
                    <option value="brand2">Brand 2</option>
                    <option value="brand3">Brand 3</option>
                </select>
            </div>
            <div>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="">Select Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                </select>
            </div>
            <div>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="">Select Price Range</option>
                    <option value="range1">Price Range 1</option>
                    <option value="range2">Price Range 2</option>
                    <option value="range3">Price Range 3</option>
                </select>
            </div>
            <div>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="">Select Sorting</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProduct.map((product) => (
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
