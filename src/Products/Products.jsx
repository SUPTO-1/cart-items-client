import { useEffect, useState } from "react";
import Product from "./Product";
import { IoSearch } from "react-icons/io5";

const Products = () => {
    const [allproduct, setAllProduct] = useState([]);
    const [filterBrand, setFilterBrand] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [sorting, setSorting] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/products?Brand_Name=${filterBrand}&Category_Name=${filterCategory}&sorting=${sorting}&Price=${priceRange}&page=${currentPage}&limit=10`)
            .then(res => res.json())
            .then(data => {
                setAllProduct(data.products || []);  // Ensure the products are an array
                setTotalProducts(data.totalProducts || 0);  // Handle case where totalProducts might be undefined
                setTotalPages(data.totalPages || 1);  // Handle case where totalPages might be undefined
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setAllProduct([]);  // Set to empty array in case of an error
            });
    }, [filterBrand, filterCategory, priceRange, currentPage, sorting]);

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

    const [searchQuery, setSearchQuery] = useState("");

    const filteredProduct = allproduct.filter(product => {
        return product.productName?.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <h2 className="text-3xl text-center mt-10 mb-10">Products List</h2>
            <div className='lg:w-6/12 w-4/5 mx-auto mt-10'>
                <label className="input rounded-full flex items-center gap-2 pl-5 h-14 border border-black">
                    <input type="text" className="grow rounded-full text-lg" placeholder="Search here by product name...." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className="h-10 bg-[#bdac8f] text-[#FFFFFF] rounded-full w-10 border-[#bdac8f] text-xl"><IoSearch className="text-xl ml-2" /></button>
                </label>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-4'>
                <div>
                    <select name='brand' className="px-3 w-full rounded-lg h-12 border-2 border-[#2d2c2ca7] bg-transparent placeholder-[#080808]" onChange={handleBrandName}>
                        <option value="">Brand</option>
                        <option>ArtEco</option>
                        <option>ColorPro</option>
                        <option>CanvasMaster</option>
                        <option>TechArt</option>
                        <option>CraftyGoods</option>
                        <option>ArtisanCraft</option>
                        <option>CreativeHub</option>
                    </select>
                </div>
                <div>
                    <select name='category' className="px-3 w-full rounded-lg h-12 border-2 border-[#2d2c2ca7] bg-transparent placeholder-[#080808]" onChange={handleCategory}>
                        <option value="">Category</option>
                        <option>Painting and Drawing</option>
                        <option>Sculpture and Modeling</option>
                        <option>Textile Arts</option>
                        <option>Paper Crafts & Glass Art</option>
                        <option>Ceramics and Pottery</option>
                        <option>Jute & Wooden Crafts</option>
                    </select>
                </div>
                <div>
                    <select name='priceRange' className="px-3 w-full rounded-lg h-12 border-2 border-[#2d2c2ca7] bg-transparent placeholder-[#080808]" onChange={handlePriceRange}>
                        <option value="">Price Range</option>
                        <option>0-50 </option>
                        <option>51-100</option>
                        <option>101-150 </option>
                        <option>151-200 </option>
                    </select>
                </div>
                <div>
                    <select name='sorting' className="px-3 w-full rounded-lg h-12 border-2 border-[#2d2c2ca7] bg-transparent placeholder-[#080808]" onChange={handleSorting}>
                        <option value="">Sorting</option>
                        <option value={1}>Low to High</option>
                        <option value={-1}>High to Low</option>
                        <option value={2}>Newest first</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    filteredProduct.map(product =><Product key={product._id} product={product}></Product>)
                }
            </div>
            <div className="flex justify-center mt-6 items-center text-lg my-4">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} className="btn btn-accent text-lg text-white ">Previous</button>
                <span className="mx-4 text-blue-500">Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} className="btn btn-accent text-lg text-white ">Next</button>
            </div>
        </div>
    );
};

export default Products;
