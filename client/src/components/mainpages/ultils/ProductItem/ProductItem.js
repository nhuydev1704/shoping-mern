import React from 'react'
import BtnRender from './BtnRender'

function ProductItem({ product, isAdmin, deleteProduct, handleChangeInput }) {

    return (
        <div className="product_cart">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleChangeInput(product._id)}
                />
            }

            <img src={product.images.url} alt="" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>{product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                <p>{product.description}</p>
            </div>

            <BtnRender product={product} deleteProduct={deleteProduct} />

        </div>
    )
}

export default ProductItem
