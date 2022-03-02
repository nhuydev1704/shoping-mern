import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function Filter() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;

    const [category, setCategory] = state.productsAPI.category;
    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;
    const [selected, setSelectd] = React.useState('');
    // const [page, setPage] = useState(1)
    // const [result, setResult] = useState(0)

    const handleCategory = (e) => {
        setCategory(e.target.value);
        setSearch('');
    };

    return (
        <div className="flex flex-wrap justify-between items-center my-4">
            {/* <span>Fliters: </span> */}
            <div className="flex flex-wrap">
                {categories && categories.length > 0 && (
                    <div
                        onClick={() => {
                            setCategory('');
                            setSelectd('');

                            setSearch('');
                        }}
                        className={`my-2 hover:opacity-80 border-[1px] cursor-pointer border-red-700 rounded font-bold  min-w-[140px] py-2 text-center text-red-700 mx-4 ${
                            category === '' ? 'bg-red-700 text-white' : ''
                        }`}
                    >
                        Tất cả sản phẩm
                    </div>
                )}

                {categories.map((category) => (
                    <div
                        onClick={() => {
                            setCategory('category=' + category._id);
                            setSelectd('category=' + category._id);
                            setSearch('');
                        }}
                        className={`my-2 hover:opacity-80 border-[1px] cursor-pointer border-red-700 rounded font-bold  min-w-[140px] py-2 text-center text-red-700 mx-4 ${
                            'category=' + category._id === selected ? 'bg-red-700 text-white' : ''
                        }`}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
            <select
                className="bg-white shadow-lg min-w-[200px] border border-red-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="">Mới Nhất</option>
                <option value="sort=oldest">Cũ Nhất</option>
                <option value="sort=-sold">Bán chạy nhất</option>
                <option value="sort=-price">Giá: Cao-Thấp</option>
                <option value="sort=price">Price: Thấp-Cao</option>
            </select>
        </div>
    );
}

export default Filter;
