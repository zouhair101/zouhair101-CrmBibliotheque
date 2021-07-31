import React from 'react';
import PropTypes from 'prop-types';
import './Tableheader.scss';
import {getFormattedMessage} from "../sharedMethod";

const TableHeader = (props) => {
    const { headers, sortObject, staticField, sortConfig, sortAction, isAction = true, isStatusField } = props;

    const sort = (header) => {
        sortAction({ orderBy: header, order: sortObject.order === 'asc' ? 'desc' : 'asc' })
    };

    const sortIcon = (header) => {
        return sortConfig(header, sortObject)
    };

    const renderActionColumn = () => {
        if (isAction) {
            return <th className="table-header__action table-header__responsive">{getFormattedMessage('react-data-table.action.column')}</th>;
        }
    };
    const renderStaticColumn = () => {
        if (staticField) {
            return <th className="table-header__responsive">{staticField}</th>;
        }
    };
    const renderStatusColumn = () => {
        if (isStatusField) {
            return <th className="table-header__status table-header__responsive">{getFormattedMessage('react-data-table.status.column')}</th>;
        }
    };
    return (
        <tr className="table-header">
            {renderStaticColumn()}
            {headers.map(header =>
                (
                    <th key={header.id} onClick={() => sort(header.id)} className="table-header">
                        <div className="d-flex justify-content-between"><span>{header.name}</span> {sortIcon(header.id)}
                        </div>
                    </th>
                ))}
            {renderStatusColumn()}
            {renderActionColumn()}
        </tr>
    );
};

TableHeader.propTypes = {
    sortObject: PropTypes.object,
    headers: PropTypes.array,
    staticField: PropTypes.string,
    isAction: PropTypes.bool,
    isStatusField: PropTypes.bool,
    sortConfig: PropTypes.func,
    sortAction: PropTypes.func,
};

export default TableHeader;
