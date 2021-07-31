import React from 'react';
import PropTypes from 'prop-types';
import {bookRequestConstants} from "../../constants/index";
import {getFormattedMessage} from "../sharedMethod";

const BookRequestStatus = (props) => {
    const { status } = props;

    switch (status) {
        case bookRequestConstants.PENDING:
            return <span className="text-warning">
                 <strong>
                    {getFormattedMessage('book-request.filter.pending.label')}
                </strong>
            </span>;
        case bookRequestConstants.APPROVED:
            return <span className="text-success">
                 <strong>
                      {getFormattedMessage('book-request.filter.approved.label')}
                </strong>
            </span>;
        case bookRequestConstants.AVAILABLE:
            return <span className="text-info">
                 <strong>
                       {getFormattedMessage('book-request.filter.available.label')}
                </strong>
            </span>;
        default:
            return <span className="text-danger">
                <strong>
                      {getFormattedMessage('book-request.filter.cancel.label')}
                </strong>
            </span>;
    }
};

BookRequestStatus.propTypes = {
    status: PropTypes.number,
};

export default (BookRequestStatus);
