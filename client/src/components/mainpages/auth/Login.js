import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })

    }

    const onSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })
            localStorage.setItem('firstLogin', true)
            window.location.href = '/'

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="login-page">
            <form onSubmit={onSubmit}>
                <h2>ĐĂNG NHẬP</h2>
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password"
                    name="password"
                    required
                    placeholder="PassWord"
                    value={user.password}
                    onChange={onChangeInput}
                    autoComplete="on"
                />

                <div className="row">
                    <button type="submit">Đăng Nhập</button>
                    <Link to="/register">Đăng Ký</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
