import React from 'react';
import { IoCartOutline, IoStar, IoHeartOutline } from "react-icons/io5";

const Product = ({ product }) => {
    return (
        <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 overflow-hidden w-72">
            <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-red-500 p-1.5 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform duration-200">
                <IoHeartOutline className="text-white text-lg" />
            </div>
            <figure className="relative">
                <img
                    src={product.image_link}
                    alt={product.product_name}
                    className="h-52 w-full object-cover rounded-t-xl"
                />
            </figure>
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-red-500 transition-colors duration-300">
                    {product.product_name}
                </h2>
                <p className="text-gray-600 mb-3 text-sm">
                    {product.description}
                </p>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-green-500">
                        ${product.price.toFixed(2)}
                    </span>
                    <div className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {product.category_name}
                    </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                            index < Math.round(product.rating) ? (
                                <IoStar key={index} className="text-yellow-400 text-base" />
                            ) : (
                                <IoStar key={index} className="text-gray-300 text-base" />
                            )
                        ))}
                        <span className="text-gray-500 ml-1 text-sm">
                            {product.rating.toFixed(1)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-2">
                        {new Date(product.creation_date).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <button className="btn bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-full hover:from-purple-600 hover:to-indigo-600 transition-colors duration-300 text-sm">
                        <IoCartOutline className="text-lg mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
