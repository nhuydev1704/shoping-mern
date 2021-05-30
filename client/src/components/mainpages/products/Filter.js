import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function Filter() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    // const [page, setPage] = useState(1)
    // const [result, setResult] = useState(0)


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }
    return (
        <div className="filter_menu">
            {/* <span>Fliters: </span> */}
            <div className="row">
                <div className="select">
                    <select name="category" value={category} onChange={handleCategory}>
                        <option value="">All products</option>
                        {
                            categories.map(category => (
                                <option value={"category=" + category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="row form-style-4">
                <label htmlFor="field1">
                    <span></span>
                        <input type="text" value={search}
                        onChange={e => setSearch(e.target.value.toLowerCase())}
                        name="field1" placeholder="Nhập để tìm kiếm"
                    />
                </label>
            </div>
            {/* <span>Sort By: </span> */}
            <div className="row">
                <div className="select">
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="">Mới Nhất</option>
                        <option value="sort=oldest">Cũ Nhất</option>
                        <option value="sort=-sold">Bán chạy nhất</option>
                        <option value="sort=-price">Giá: Cao-Thấp</option>
                        <option value="sort=price">Price: Thấp-Cao</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filter
