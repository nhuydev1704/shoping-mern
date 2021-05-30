import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import {showErrMsg, showSuccessMsg} from '../ultils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../ultils/validation/Validation'


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    // const [user, setUser] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    // })

    // const onChangeInput = e => {
    //     const { name, value } = e.target;
    //     setUser({ ...user, [name]: value })

    // }

    // const onSubmit = async e => {
    //     e.preventDefault()
    //     try {
    //         await axios.post('/user/register', { ...user })
    //         localStorage.setItem('firstLogin', true)

    //         window.location.href = '/'

    //     } catch (err) {
    //         alert(err.response.data.msg)
    //     }
    // }
    // return (
    //     <>
    //     <div className="login-page">
    //         <form onSubmit={onSubmit}>
    //             <Link to="/" className="close--form">X</Link>
    //             <h2>ĐĂNG KÝ</h2>

    //             <input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput} />

    //             <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />

    //             <input type="password"
    //                 name="password"
    //                 required
    //                 placeholder="PassWord"
    //                 value={user.password}
    //                 onChange={onChangeInput}
    //                 autoComplete="on"
    //             />

    //             <div className="row">
    //                 <button type="submit">Đăng Ký</button>
    //                 <Link to="/login">Đăng Nhập</Link>
    //             </div>

    //         </form>
            
    //     </div>
    //     <div className="modal"></div> </>
    // )
    const [user, setUser] = useState(initialState)

    const {name, email, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Hãy điền đầy đủ thông tin.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Email không chính xác.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Mật khẩu tối thiểu 6 kí tự.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Mật khẩu nhập lại không khớp.", success: ''})

        try {
            const res = await axios.post('/user/register', {
                name, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login_page">
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Tên</label>
                    <input type="text" placeholder="Nhập tên" id="name"
                    value={name} name="name" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="email">Địa chỉ email</label>
                    <input type="text" placeholder="Nhập địa chỉ email" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" placeholder="Nhập mật khẩu" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="cf_password">Xác thực mật khẩu</label>
                    <input type="password" placeholder="Xác thực mật khẩu" id="cf_password"
                    value={cf_password} name="cf_password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Đăng ký</button>
                </div>
            </form>

            <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </div>
    )
}

export default Register
