import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import Cart from './icon/cart.svg'
import Close from './icon/close.svg'
import Menu from './icon/menu.svg'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }

    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Create Product</Link>
                </li>
                <li>
                    <Link to="/category">Categories</Link>
                </li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link to="/history">History</Link>
                </li>
                <li>
                    <Link to="/" onClick={logoutUser}>LogOut</Link>
                </li>
            </>
        )
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="menu" width="30" />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'SHOPC4'}</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                <li>
                    <Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link>
                </li>
                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ⨁ Register</Link></li>
                }

                {/* <li>
                    <Link to="/login">Login ⨁ Register</Link>
                </li> */}
                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="close" width="30" className="menu" />
                </li>
            </ul>
            {
                isAdmin ? '' : <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="cart" width="30" />
                    </Link>
                </div>
            }

        </header>
    )
}

export default Header
