import React from 'react'

const setOrder = (filedName, sortObject) => {
    if (sortObject.orderBy === filedName) {
        if (sortObject.order === 'asc') {
            return { order: 'asc' }
        }
        else if (sortObject.order === 'desc') {
            return { order: 'desc' }
        }
        return { order: 'none' }
    }
    return { order: 'none' };
};

const renderSortIcon = (order) => {
    const upIconClass = `fa fa-long-arrow-down fa-xs  ${order === 'asc' ? 'sort-arrow-group__hidden' : 'sort-arrow-group__visible'}`;
    const downIconClass = `fa fa-long-arrow-up fa-xs  ${order === 'desc' ? 'sort-arrow-group__hidden' : 'sort-arrow-group__visible'}`;
    return (
        <span className="sort-arrow-group">
             <i className={downIconClass}/>
            <i className={upIconClass}/>
        </span>
    );
};

export const sortConfig = (filedName, sortObject) => {
    const result = setOrder(filedName, sortObject);
    switch (result.order) {
        case 'asc':
            return renderSortIcon('asc');
        case 'desc':
            return renderSortIcon('desc');
        default:
            return renderSortIcon('none');
    }
};

export const renderSortIcons = renderSortIcon;
