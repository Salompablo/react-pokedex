import React from 'react'
import './_pagination.scss'

export default function Pagination(props) {

    const {onLeftClick, onRightClick, page, totalPages} = props;


return (
    <div className='pagination'>
        <button onClick={onLeftClick}>LEFT</button>
        <div>{page} de {totalPages}</div>
        <button onClick={onRightClick}>RIGHT</button>
    </div>
)
}
