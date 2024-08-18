import { useEffect, useState } from "react";
import Product from "./Product";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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
      <h2 className="text-3xl font-bold mb-20 text-center">
        Our Available Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProduct.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>

<div className="flex justify-center mt-6 items-center text-lg my-4">
    <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage <= 1} 
        className={`px-4 py-2 mx-2 rounded-lg ${currentPage <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} text-white`}
    >
        <IoChevronBack className="text-xl" />
    </button>
    <span className="mx-4 text-blue-500 font-semibold">
        Page {currentPage} of {totalPages}
    </span>
    <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage >= totalPages} 
        className={`px-4 py-2 mx-2 rounded-lg ${currentPage >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} text-white`}
    >
        <IoChevronForward className="text-xl" />
    </button>
</div>

    </div>
  );
};

export default Products;
