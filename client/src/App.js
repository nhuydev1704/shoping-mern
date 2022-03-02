import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/footers/Footer';
import Header from './components/headers/Header';
import Pages from './components/mainpages/Pages';
import { DataProvider } from './GlobalState';

// import {useDispatch, useSelector} from 'react-redux'
// import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'
// import axios from 'axios';

function App() {
    // const dispatch = useDispatch()
    // const token = useSelector(state => state.token)
    // const auth = useSelector(state => state.auth)

    // useEffect(() => {
    //   const firstLogin = localStorage.getItem('firstLogin')
    //   if(firstLogin){
    //     const getToken = async () => {
    //       const res = await axios.post('/user/refresh_token', null)
    //       dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
    //     }
    //     getToken()
    //   }
    // },[auth.isLogged, dispatch])

    // useEffect(() => {
    //   if(token){
    //     const getUser = () => {
    //       dispatch(dispatchLogin())

    //       return fetchUser(token).then(res => {
    //         dispatch(dispatchGetUser(res))
    //       })
    //     }
    //     getUser()
    //   }
    // },[token, dispatch])

    return (
        <DataProvider>
            <Router>
                <div className="flex flex-col justify-between h-screen">
                    <Header />
                    <div className="container mx-auto flex-1">
                        <Pages />
                    </div>
                    <Footer />
                </div>
            </Router>
        </DataProvider>
    );
}

export default App;
