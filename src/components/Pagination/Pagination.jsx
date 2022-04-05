import React from 'react'
import './_pagination.scss'
import { LeftArrow, RightArrow } from '../ArrowSvg/ArrowSvg.jsx'

export default function Pagination(props) {

    const {onLeftClick, onRightClick, page, totalPages} = props;


    return (
        <div className="pagination">
        <button className="pagination-btn" onClick={onLeftClick}>
            <div className="icon">
            <LeftArrow />
            </div>
        </button>
        <div>
            {page} de {totalPages}
        </div>
        <button className="pagination-btn" onClick={onRightClick}>
            <div className="icon">
            <RightArrow />
            </div>
        </button>
        </div>
    );
}
