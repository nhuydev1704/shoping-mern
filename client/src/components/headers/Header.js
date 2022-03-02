import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Cart from './icon/cart.png';
import Close from './icon/close.svg';
import Menu from './icon/menu.svg';
// import {useSelector} from 'react-redux'

function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;
    const [menu, setMenu] = useState(false);
    const [userr] = state.userAPI.userr;
    const [search, setSearch] = state.productsAPI.search;
    const { pathname } = useLocation();

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
        await axios.get('/user/logout');

        localStorage.removeItem('firstLogin');

        window.location.href = '/';
    };
    //
    const adminRouter = () => {
        return (
            <>
                <li className="text-white">
                    <Link to="/create_product">Thêm sản phẩm</Link>
                </li>
                <li className="text-white">
                    <Link to="/category">Danh mục</Link>
                </li>
            </>
        );
    };

    const userLink = () => {
        return (
            <li className="drop-nav top-[6px]">
                <Link to="#" className="avatar flex items-center">
                    <img src={userr.avatar} alt="" /> <span className="mx-1">{userr.name}</span>{' '}
                    <i className="fas fa-angle-down"></i>
                </Link>
                <ul className="dropdown">
                    <li>
                        <Link to="/profile">Thông tin</Link>
                    </li>
                    {/*<li>
                    <Link to="/history">History</Link>
                </li>*/}
                    <li>
                        <Link to="/" onClick={logoutUser}>
                            Đăng xuất
                        </Link>
                    </li>
                </ul>
            </li>
        );
    };

    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link to="/history">Lịch sử</Link>
                </li>
            </>
        );
    };

    const transForm = {
        transform: isLogged ? 'translateY(-5px)' : 0,
        left: menu ? 0 : '-100%',
    };
    return (
        <header className="bg-[#D70018]">
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="menu" width="30" />
            </div>
            <div className="logo flex items-center">
                <h1 className="text-2xl">
                    <Link to="/">{isAdmin ? 'Admin' : 'SHOPC4'}</Link>
                </h1>
                {pathname !== '/login' && pathname !== '/register' && pathname !== '/cart' && pathname !== '/checkout' && (
                    <div className="relative z-0 ml-5 w-[400px] group">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            name="field1"
                            id="floating_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-slate-200 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            for="floating_first_name"
                            className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nhập để tìm kiếm
                        </label>
                    </div>
                )}
            </div>
            <ul style={transForm}>
                <li className="text-white">
                    <Link to="/">{isAdmin ? 'Sản phẩm' : 'Cửa hàng'}</Link>
                </li>
                {isAdmin && adminRouter()}

                {/* {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ⨁ Register</Link></li>
                }*/}
                {isLogged && loggedRouter()}
                {isLogged ? (
                    userLink()
                ) : (
                    <li className="text-white">
                        <Link to="/login">
                            <i className="fas fa-user"></i> Đăng nhập
                        </Link>
                    </li>
                )}
                {/* <li>
                    <Link to="/login">Login ⨁ Register</Link>
                </li> */}
                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="close" width="30" className="menu" />
                </li>
            </ul>
            {isAdmin ? (
                ''
            ) : (
                <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="cart" width="30" />
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
