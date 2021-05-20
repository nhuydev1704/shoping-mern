import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import Load from '../detailProduct/loading.gif'
import { getData } from '../ultils/FetchData'
import ProductItem from '../ultils/ProductItem/ProductItem'
import CommentItem from './commentItem/CommentItem'
import FormInput from './formInput/FormInput'
import Rating from './rating/Rating'

function DetailProduct() {
    const {id} = useParams()
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const addCart = state.userAPI.addCart
    const socket = state.socket


    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState([])
    const [page] = useState(1)
    

    

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    useEffect(() => {
        setLoading(true)
        getData(`/api/comments/${id}?limit=${page * 6}`)
            .then(res => {
                setComments(r => r = res.data.comments)
                setLoading(false)
            })
            .catch(err => console.log(err.response.data.msg))
    }, [id,page]);

//realtime
    //join room
    
    useEffect(() => {
        if(socket) {
            socket.emit('joinRoom', id)
        }
    },[socket,id])

    useEffect(() => {
        if(socket) {
            socket.on('sendCommentToClient', msg => {
                setComments([msg, ...comments])
            })

            return () => socket.off('sendCommentToClient')
        }
    },[socket,comments])

    //scroll
    // var pageEnd1 = useRef()
    // useEffect(() => {
    //     const observer = new IntersectionObserver(entries => {
    //         if(entries[0].isIntersecting){
    //             setPage(prev => prev + 1)
    //         }
    //     },{
    //         threshold: 0.1
    //     })

    //     observer.observe(pageEnd1.current)
    // },[])

    //reply comment
    // Reply Comments
    useEffect(() => {
        if(socket){
            socket.on('sendReplyCommentToClient', msg => {
                const newArr = [...comments]
                
                newArr.forEach(cm => {
                    if(cm._id === msg._id) {
                        cm.reply = msg.reply
                    }
                })

                setComments(newArr)
            })

            return () => socket.off('sendReplyCommentToClient')
        } 
    },[socket, comments])

    console.log(detailProduct)
    if (detailProduct.length === 0) return null;
    return (

        <div>
            <div className="detail">
                <img src={detailProduct.images.url} alt="anhdep" />
                <div className="box-detail">
                    <div className="row">
                        <h2>
                            {detailProduct.title}
                        </h2>
                        <h6>
                            #id: {detailProduct.product_id}
                        </h6>
                        <span>{detailProduct.price} VND</span>
                        <p>{detailProduct.description}</p>
                        <p>{detailProduct.content}</p>
                        <p>Sold: {detailProduct.sold}</p>
                        <Link to="/cart"
                            className="cart"
                            onClick={() => addCart(detailProduct)}
                        >
                            Mua Ngay
                        </Link>
                        <div>
                            <h3 style={{margin: '10px 0'}}>Xếp hạng: {detailProduct.numReviews} đánh giá</h3>
                            <Rating props={detailProduct}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
            <div className="comments">
                <h2>Bình luận và đánh giá</h2>

                <div className="reviews">
                    <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                    <label htmlFor="rd-5" className="fas fa-star"></label>
                    
                    <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                    <label htmlFor="rd-4" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                    <label htmlFor="rd-3" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                    <label htmlFor="rd-2" className="fas fa-star"></label>

                    <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                    <label htmlFor="rd-1" className="fas fa-star"></label>
                </div>
           
                <FormInput id={id} socket={socket} rating={rating}/>
            
                <div className="comments_list">
                    {
                        comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} socket={socket} />
                        ))
                    }
                </div>
            </div>
            {
                loading && <div className="loading">
                    <img src={Load} alt="" />
                </div>
            }
        {/* <button ref={pageEnd1} style={{opacity: 0}}>Load more</button> */}
        </div>
    )
}

export default DetailProduct
