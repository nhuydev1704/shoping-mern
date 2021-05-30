import axios from 'axios'
import { useEffect, useState } from 'react'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [userr, setUserr] = useState([])
    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setUserr(res.data)
                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            // const getAllUser = async () => {
            //     try {
            //         const res = await axios.get('/user/all_infor', {
            //             headers: { Authorization: token }
            //         })

            //         setAllUser(res.data)


            //     } catch (err) {
            //         alert(err.response.data.msg)
            //     }
            // }

            getUser();
            // getAllUser();
        }
    }, [token])



    const addCart = async (product) => {
        if (!isLogged) return alert("Hãy đăng nhập trước khi mua sản phẩm.")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])

            await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
                headers: { Authorization: token }
            })
        } else {
            alert("This product has been added to cart.")
        }
    }

    const loadAllUser = async() => {
                try {
                    const res = await axios.get('/user/all_infor', {
                        headers: { Authorization: token }
                    })

                    setAllUser(res.data)


                } catch (err) {
                }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        userr: [userr,setUserr],
        allUser: [allUser, setAllUser],
        loadAllUser: loadAllUser
    }
}

export default UserAPI
