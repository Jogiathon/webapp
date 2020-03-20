import React from 'react';
import __ from 'lodash';

const Pagination = (props) => {
    const { postsCount, pageSize, currentPage, onPageChange} = props;
    const pagesCount = Math.ceil(postsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = __.range(1, pagesCount + 1);

    return ( 
        
        <nav>
            <ul className="pagination">
            {pages.map(page => (
                <li key={page} className={ page === currentPage ? "page-item active" : "page-item"}>
                    <a 
                        active="true"
                        className="page-link" 
                        onClick={() => onPageChange(page)}
                        href="#">{page}
                    </a>
                </li>
                ))}
            </ul>
        </nav>
     );
}
 
export default Pagination;