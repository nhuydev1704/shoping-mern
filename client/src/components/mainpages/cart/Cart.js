import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import PaypalButton from './PaypalButton'


function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [total, setTotal] = useState(0)
    const [token] = state.token

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])


    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        });

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        });

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id => {
        if (window.confirm("Bạn có muốn xóa sản phẩm?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async (payment) => {
        console.log(payment)
        const { paymentID, address } = payment;
        const priceCheckout = total;

        await axios.post('./api/payment', { cart, paymentID, address, priceCheckout }, {
            headers: { Authorization: token }
        })

        setCart([])
        addToCart([])
        alert("Đặt hàng thành công.")
    }

    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Giỏ hàng trống...</h2>
    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="anhdep" />
                        <div className="box-detail">
                            <h2>
                                {product.title}
                            </h2>
                            <h3>Giá: {(product.price * product.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
                            <p>{product.description}</p>
                            {/* <p>{product.content}</p> */}
                            <div className="amount">
                                <button onClick={() => decrement(product._id)}>
                                    -
                                </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}>
                                    +
                                </button>
                            </div>

                            <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: ${parseInt(total / 23000).toFixed(2)}</h3>
                <PaypalButton total={parseInt(total / 23000).toFixed(2)}
                    tranSuccess={tranSuccess}
                />
            </div>
        </div>
    )
}

export default Cart
