import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import Cart from './icon/cart.svg'
import Close from './icon/close.svg'
import Menu from './icon/menu.svg'
// import {useSelector} from 'react-redux'


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)
    const [userr] = state.userAPI.userr
    //
    // const auth = useSelector(state => state.auth)
    // const {user} = auth


    // const handleLogout = async () => {
    //     try {
    //         await axios.get('/user/logout')
    //         localStorage.removeItem('firstLogin')
    //         window.location.href = "/";
    //     } catch (err) {
    //         window.location.href = "/";
    //     }
    // }
    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }
    //
    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Thêm sản phẩm</Link>
                </li>
                <li>
                    <Link to="/category">Danh mục</Link>
                </li>
            </>
        )
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
                <img src={userr.avatar} alt="" /> {userr.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Thông tin</Link></li>
                {/*<li>
                    <Link to="/history">History</Link>
                </li>*/}
                <li>
                    <Link to="/" onClick={logoutUser}>Đăng xuất</Link>
                </li>
            </ul>
        </li>
    }

    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link to="/history">Lịch sử</Link>
                </li>
            </>
        )
    }


    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0,
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
            <ul style={transForm}>
                <li>
                    <Link to="/">{isAdmin ? 'Sản phẩm' : 'Cửa hàng'}</Link>
                </li>
                {isAdmin && adminRouter()}

                {/* {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ⨁ Register</Link></li>
                }*/}
                {
                    isLogged && loggedRouter()
                }
                {
                    isLogged
                        ? userLink()
                        : <li><Link to="/login"><i className="fas fa-user"></i> Đăng nhập</Link></li>
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
