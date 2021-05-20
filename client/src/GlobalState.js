import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import CategoriesAPI from './api/CategoriesAPI'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'

export const GlobalState = createContext()

export const DataContext = createContext()


export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    const [socket, setSocket] = useState(null)


    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        // getData('/api/products')
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err.response.data.msg))


        const socket = io();
        setSocket(socket)
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get("/user/refresh_token");

                setToken(res.data.accesstoken)

                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            // const firstLogin = localStorage.getItem('firstLogin')
            // if (firstLogin) return 
            refreshToken()
        }
        
        return () => socket.close()

    }, [])

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        socket
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}