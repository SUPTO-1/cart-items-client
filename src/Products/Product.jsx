const Product = ({ product }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <figure>
          <img
            src={product.productImage}
            alt={product.productName}
            className="h-60 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-gray-800">
            {product.productName}
          </h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-semibold text-primary">
              ${product.price}
            </span>
            <div className="badge badge-outline badge-primary text-sm">
              {product.category}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <span className="text-yellow-500">
                {"★".repeat(product.ratings)}
              </span>
              <span className="text-gray-400 ml-2">
                {product.ratings}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {product.creationDateTime}
            </p>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    );
};

export default Product;