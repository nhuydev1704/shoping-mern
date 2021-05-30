import React, { useContext } from 'react'
import { Switch, Route } from 'react-router'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import DetailProduct from './detailProduct/DetailProduct'
import OrderDetails from './history/OrderDetails'
import Products from './products/Products'
import NotFound from './ultils/NotFound/NotFound'

import { GlobalState } from '../../GlobalState'
import OrderHistory from './history/OrderHistory'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

import ActivationEmail from './auth/ActivationEmail'
import ForgotPass from './auth/ForgotPassword'
import ResetPass from './auth/ResetPassword'

import Profile from './profile/Profile'
import EditUser from './profile/EditUser'

function Pages() {
    const state = useContext(GlobalState)
    const [isLooged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <div>
            <Switch>
                <Route path="/" exact component={Products} />
                <Route path="/detail/:id" exact component={DetailProduct} />

                <Route path="/login" exact component={isLooged ? NotFound : Login} />
                <Route path="/register" exact component={isLooged ? NotFound : Register} />

                <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
                <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
                <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

                <Route path="/history" exact component={isLooged ? OrderHistory : NotFound} />
                <Route path="/history/:id" exact component={isLooged ? OrderDetails : NotFound} />


                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                <Route path="/forgot_password" component={isLooged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLooged ? NotFound : ResetPass} exact />

                <Route path="/profile" component={isLooged ? Profile : NotFound} exact />
                <Route path="/cart" exact component={Cart} />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

                <Route path="*" component={NotFound} />

            </Switch>
        </div>
    )
}

export default Pages
