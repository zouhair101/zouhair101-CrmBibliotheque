import React from 'react';
import PropTypes from 'prop-types';
import {bookCirculationStatusConstant} from "../../admin/constants";
import {getFormattedMessage} from "../sharedMethod";

const BookStatus = ( props) => {
    const { status, item } = props;

    switch (status) {
        case bookCirculationStatusConstant.BOOK_ISSUED:
            item.status_name = getFormattedMessage('book-history.filter.issued.label');
            return <span className="text-success">
                <strong>
                    {getFormattedMessage('book-history.filter.issued.label')}
                </strong>
            </span>;
        case bookCirculationStatusConstant.BOOK_AVAILABLE:
            item.status_name = getFormattedMessage('book-history.filter.available.label');
            return <span className="text-success">
                <strong>
                    {getFormattedMessage('book-history.filter.available.label')}
                </strong>
            </span>;
        case bookCirculationStatusConstant.BOOK_RETURNED:
            item.status_name = getFormattedMessage('book-history.filter.returned.label');
            return <span className="text-dark">
                <strong>
                    {getFormattedMessage('book-history.filter.returned.label')}
                </strong>
            </span>;
        case bookCirculationStatusConstant.BOOK_LOST:
            item.status_name = getFormattedMessage('book-history.filter.lost.label');
            return <span className="text-danger">
                <strong>
                    {getFormattedMessage('book-history.filter.lost.label')}
                </strong>
            </span>;
        case bookCirculationStatusConstant.BOOK_DAMAGED:
            item.status_name = getFormattedMessage('book-history.filter.damaged.label');
            return <span className="text-warning">
                <strong>
                    {getFormattedMessage('book-history.filter.damaged.label')}
                </strong>
            </span>;
        case bookCirculationStatusConstant.BOOK_UN_RESERVED:
            item.status_name = getFormattedMessage('book-history.filter.unreserved.label');
            return <span className="text-info">
                <strong>
                    {getFormattedMessage('book-history.filter.unreserved.label')}
                </strong>
            </span>;
        default:
            item.status_name = getFormattedMessage('book-history.filter.reserved.label');
            return <span className="text-primary">
                <strong>
                    {getFormattedMessage('book-history.filter.reserved.label')}
                </strong>
            </span>
    }
};

BookStatus.propTypes = {
    item: PropTypes.object,
    status: PropTypes.number,
};

export default (BookStatus);
