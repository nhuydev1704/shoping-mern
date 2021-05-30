import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../ultils/notification/Notification'
// import {dispatchLogin} from '../../../redux/actions/authAction'
// import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {
    // const [user, setUser] = useState({
    //     email: '',
    //     password: '',
    // })
    // 
    const [user, setUser] = useState(initialState)
    // const dispatch = useDispatch()
    // const history = useHistory()
    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUser({...user, [name]:value, err: '', success: ''})

    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })
            localStorage.setItem('firstLogin', true)
            window.location.href = '/'

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    
    // const handleSubmit = async e => {
    //     e.preventDefault()
    //     try {
    //         const res = await axios.post('/user/login', {email, password})
    //         setUser({...user, err: '', success: res.data.msg})

    //         localStorage.setItem('firstLogin', true)

    //         dispatch(dispatchLogin())
    //         history.push("/")

    //     } catch (err) {
    //         err.response.data.msg && 
    //         setUser({...user, err: err.response.data.msg, success: ''})
    //     }
    // }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login', {tokenId: response.tokenId})
            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)

            // dispatch(dispatchLogin())
            window.location.href = '/'
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseFacebook = async (response) => {
        try {
            const {accessToken, userID} = response
            const res = await axios.post('/user/facebook_login', {accessToken, userID})

            setUser({...user, error:'', success: res.data.msg})
            localStorage.setItem('firstLogin', true)


            window.location.href = '/'
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    return (
        // <>
        //    { <div className="login-page">
        //         <form onSubmit={onSubmit}>
        //             <Link to="/" className="close--form">X</Link>
        //             <h2>ĐĂNG NHẬP</h2>
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
        //                 <button type="submit">Đăng Nhập</button>
        //                 <Link to="/register">Đăng Ký</Link>
        //             </div>
        //         </form>
            
        //     </div>
        //     <div className="modal"></div>}
        // </>
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Địa chỉ Email</label>
                    <input type="text" placeholder="Địa chỉ Email" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" placeholder="Mật khẩu" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Đăng nhập</button>
                    <Link to="/forgot_password">Quên mật khẩu?</Link>
                </div>
            </form>

            <div className="hr">Đăng nhập bằng</div>

            <div className="social">
                <GoogleLogin
                    clientId="394874475785-vpnumlouj30mbicdtvoi6g0d6si6nmac.apps.googleusercontent.com"
                    buttonText="Đăng nhập với google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                
                <FacebookLogin
                appId="145511920952572"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook} 
                />

            </div>

            <p>Thành viên mới? <Link to="/register">Đăng ký</Link></p>
        </div>
    )
}

export default Login

