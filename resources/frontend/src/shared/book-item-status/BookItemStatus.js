import React from 'react';
import PropTypes from 'prop-types';
import {bookItemStatusConstants} from "../../admin/constants";
import {getFormattedMessage} from "../sharedMethod";

const BookItemStatus = (props) => {
    const { status, item } = props;

    switch (status) {
        case bookItemStatusConstants.AVAILABLE:
            item.status_name = getFormattedMessage('books-items.filter.available.label');
            return <span className="text-success">
                 <strong>
                    {getFormattedMessage('books-items.filter.available.label')}
                </strong>
            </span>;
        case bookItemStatusConstants.UNAVAILABLE:
            item.status_name = getFormattedMessage('books-items.filter.unavailable.label');
            return <span className="text-info">
                 <strong>
                      {getFormattedMessage('books-items.filter.unavailable.label')}
                </strong>
            </span>;
        case bookItemStatusConstants.LOST:
            item.status_name = getFormattedMessage('books-items.filter.lost.label');
            return <span className="text-danger">
                 <strong>
                       {getFormattedMessage('books-items.filter.lost.label')}
                </strong>
            </span>;
        default:
            item.status_name = getFormattedMessage('books-items.filter.damaged.label');
            return <span className="text-warning">
                <strong>
                      {getFormattedMessage('books-items.filter.damaged.label')}
                </strong>
            </span>;
    }
};

BookItemStatus.propTypes = {
    item: PropTypes.object,
    status: PropTypes.number,
};

export default (BookItemStatus);
