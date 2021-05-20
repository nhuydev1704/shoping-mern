import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import Loading from '../ultils/loading/Loading'
import ProductItem from '../ultils/ProductItem/ProductItem'
import Filter from './Filter'
import LoadMore from './LoadMore'


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)


    const handleChangeInput = async (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        });
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = await axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            })

            const deleteProduct = await axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)

            alert("Xóa thành công.")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }
    if (loading) return <div><Loading /></div>
    return (
        <>
            <Filter />

            {
                isAdmin && <div className="delete-all">
                    <span>chọn tất cả</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}>Xóa Tất Cả</button>
                </div>
            }

            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product}
                            isAdmin={isAdmin} deleteProduct={deleteProduct} handleChangeInput={handleChangeInput}
                        />
                    })
                }
            </div>

            <LoadMore />
            { products.length === 0 && <Loading />}
        </>
    )
}

export default Products
