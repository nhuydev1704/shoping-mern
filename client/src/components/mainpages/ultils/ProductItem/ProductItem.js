import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../../detailProduct/rating/Rating';
import BtnRender from './BtnRender';

function ProductItem({ product, isAdmin, deleteProduct, handleChangeInput }) {
    return (
        <Link
            to={`/detail/${product._id}`}
            className="rounded-lg overflow-hidden shadow-lg p-6 bg-white hover:cursor-pointer hover:scale-[102%] hover:shadow-xl transition ease-in-out delay-50"
        >
            {isAdmin && (
                <input type="checkbox" checked={product.checked} onChange={() => handleChangeInput(product._id)} />
            )}

            <img src={product.images.url} alt="" />
            <div className="product_box">
                <h2 className="font-bold text-xl mb-2" title={product.title}>
                    {product.title}
                </h2>
                <span className="text-red-700">
                    {product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </span>
                <div className="flex my-4">
                    {product.numReviews ? (
                        <>
                            <Rating style="text-sm" props={product} /> <span>{product.numReviews} đánh giá</span>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            {/* <BtnRender product={product} deleteProduct={deleteProduct} /> */}
        </Link>
    );
}

export default ProductItem;
