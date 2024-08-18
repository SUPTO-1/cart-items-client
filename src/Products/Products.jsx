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
                    <option value="brand1">Apple</option>
                    <option value="brand2">Google</option>
                    <option value="brand3">Samsung</option>
                    <option value="brand4">Xiaomi</option>
                    <option value="brand5">Sony</option>
                    <option value="brand6">Huawei</option>
                    <option value="brand7">LG</option>
                    <option value="brand8">OnePlus</option>
                    <option value="brand9">Oppo</option>
                    <option value="brand10">Realme</option>
                    <option value="brand11">Nokia</option>
                </select>
            </div>
            <div>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="">Select Category</option>
                    <option value="category1">Smartphone</option>
                    <option value="category2">Button Phone</option>
                    <option value="category3">Tablet</option>
                </select>
            </div>
            <div>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="">Select Price Range</option>
                    <option value="range1">0-100</option>
                    <option value="range2">101-300</option>
                    <option value="range3">301-500</option>
                    <option value="range4">501-700</option>
                    <option value="range5">701-900</option>
                    <option value="range6">901-1100</option>
                    <option value="range7">1101-1300</option>
                    <option value="range8">1301-1500</option>
                </select>
            </div>
            <div>
                <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="">Select Sorting</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                    <option value="popular">Latest</option>
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
