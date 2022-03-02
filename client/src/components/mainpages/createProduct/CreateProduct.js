import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../ultils/loading/Loading';
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: '',
};
function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const param = useParams();

    const [products] = state.productsAPI.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productsAPI.callback;

    useEffect(() => {
        if (param.id) {
            setOnEdit(true);
            products.forEach((product) => {
                if (product._id === param.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            });
        } else {
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
    }, [param.id, products]);

    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const handleUpfile = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert('Bạn không phải admin');
            const file = e.target.files[0];

            if (!file) return alert('File not exists.');

            if (file.size > 1024 * 1024)
                //1mb
                return alert('Size to large!');

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                //1mb
                return alert('File format is incorrect.');

            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const res = await axios.post('/api/upload', formData, {
                headers: { 'context-type': 'multipart/form-data', Authorization: token },
            });
            setLoading(false);
            setImages(res.data);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert('Bạn không phải admin');
            setLoading(true);

            await axios.post(
                '/api/destroy',
                { public_id: images.public_id },
                {
                    headers: { Authorization: token },
                }
            );
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) return alert('Bạn không phải admin');
            if (!images) return alert('Chưa chọn ảnh!');

            if (onEdit) {
                await axios.put(
                    `/api/products/${product._id}`,
                    { ...product, images },
                    {
                        headers: { Authorization: token },
                    }
                );
            } else {
                await axios.post(
                    '/api/products',
                    { ...product, images },
                    {
                        headers: { Authorization: token },
                    }
                );
            }

            setCallback(!callback);

            history.push('/');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const styleUpload = {
        display: images ? 'block' : 'none',
    };

    return (
        <div className="create_product bg-[#ccc] mt-3">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpfile} />
                {loading ? (
                    <div id="file_img">
                        <Loading></Loading>
                    </div>
                ) : (
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                )}
            </div>

            <form onSubmit={onSubmit}>
                <div className="row">
                    <label htmlFor="product_id">ID Sản Phẩm</label>
                    <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        disabled={onEdit}
                        required
                        value={product.product_id}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="title">Tiêu Đề</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={product.title}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="price">Giá</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        value={product.price}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="description">Mô Tả</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        required
                        value={product.description}
                        rows="5"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="content">Nội Dung</label>
                    <textarea
                        type="text"
                        name="content"
                        id="content"
                        required
                        value={product.content}
                        rows="7"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor="categories">Thể loại: </label>
                    <select
                        className="select-category"
                        name="category"
                        value={product.category}
                        onChange={handleChangeInput}
                    >
                        <option value="">Chọn thể loại</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">{onEdit ? 'Cập Nhật' : 'Thêm'}</button>
            </form>
        </div>
    );
}

export default CreateProduct;
