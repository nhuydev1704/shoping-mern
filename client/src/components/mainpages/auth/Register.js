import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name: '',
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
            await axios.post('/user/register', { ...user })
            localStorage.setItem('firstLogin', true)

            window.location.href = '/'

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <>
        <div className="login-page">
            <form onSubmit={onSubmit}>
                <Link to="/" className="close--form">X</Link>
                <h2>ĐĂNG KÝ</h2>

                <input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput} />

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
                    <button type="submit">Đăng Ký</button>
                    <Link to="/login">Đăng Nhập</Link>
                </div>

            </form>
            
        </div>
        <div className="modal"></div> </>
    )
}

export default Register
