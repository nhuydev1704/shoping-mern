import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function LoadMore() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;

    return (
        <div className="load_more">
            {result < page * 10 ? '' : <button onClick={() => setPage(page + 1)}>Tải thêm</button>}
        </div>
    );
}

export default LoadMore;
