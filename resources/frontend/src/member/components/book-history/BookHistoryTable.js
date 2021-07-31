import React from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import './BookHistory.scss';
import {bookCirculationStatusConstant,} from '../../constants';
import {dateFormatter, getFormattedMessage} from '../../../shared/sharedMethod';
import BookStatus from "../../../shared/book-status/book-status";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {icon} from "../../../constants";

const BookHistoryTable = (props) => {
    const { bookHistory, onOpenModal, onChangeFilter, totalRecordMember, isLoading } = props;

    const columns = [
        {
            sortable: true,
            wrap: true,
            selector: 'name',
            name: getFormattedMessage('books.select.book.label'),
            cell: row => row.book_item.book.name
        },
        {
            sortable: true,
            selector: 'book_code',
            width: '150px',
            name: getFormattedMessage('book-history.table.book-code.column'),
            cell: row => row.book_item.book_code
        },
        {
            sortable: true,
            selector: 'issued_on',
            name: getFormattedMessage('book-history.table.issue-date.column'),
            width: '160px',
            cell: row => <span>{ row.issued_on ? renderDate(row.issued_on) : 'N/A' }</span>
        },
        {
            sortable: true,
            selector: 'issue_due_date ',
            name: getFormattedMessage('book-history.table.issue-due-date.column'),
            width: '180px',
            cell: row => <span>{ row.issue_due_date ? renderDate(row.issue_due_date) : 'N/A'}</span>
        },
        {
            sortable: true,
            selector: 'reserved_on',
            name: getFormattedMessage('book-history.table.reserve-date.column'),
            width: '180px',
            cell: row => <span>{ row.reserve_date ? renderDate(row.reserve_date) : 'N/A' }</span>
        },
        {
            sortable: true,
            selector: 'return_due_date',
            name: getFormattedMessage('book-history.table.return-due-date.column'),
            width: '180px',
            cell: row => <span>{ row.return_due_date ? renderDate(row.return_due_date) : 'N/A' }</span>
        },
        {
            sortable: true,
            selector: 'return_date',
            name: getFormattedMessage('book-history.table.return-date.column'),
            width: '150px',
            cell: row => <span>{ row.return_date ? renderDate(row.return_date) : 'N/A' }</span>
        },
        {
            sortable: true,
            selector: 'status',
            name: getFormattedMessage('react-data-table.status.column'),
            width: '100px',
            cell: row => renderBookStatus(row)
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true,
            width: '90px',
            cell: row => renderAction(row)
        }
    ];

    const renderBookStatus = (bookHistory) => {
        const statusProps = { status: bookHistory.status, item: bookHistory };
        return <BookStatus {...statusProps} item={bookHistory}/>
    };

    const renderAction = (bookHistory) => {
        if (bookHistory.status === bookCirculationStatusConstant.BOOK_RESERVED) {
            return <Button size="sm" color="danger" onClick={(e) => {
                e.stopPropagation();
                onOpenModal(bookHistory)
            }}>
                {getFormattedMessage('book-history.input.unreserve-btn.label')}
            </Button>
        }
        return '';
    };

    const renderDate = (date) => {
        return (
            <span>{date ? dateFormatter(date) : ''}</span>
        );
    };

    return (
        <ReactDataTable items={bookHistory} columns={columns} emptyStateMessageId="books-history.empty-state.title"
                        emptyNotFoundStateMessageId="books-history.not-found.empty-state.title"
                        loading={isLoading} totalRows={totalRecordMember} onChange={onChangeFilter}
                        icon={(icon.BOOK_CIRCULATION)}/>
    );
};

BookHistoryTable.propTypes = {
    bookHistory: PropTypes.array,
    totalRecordMember: PropTypes.number,
    isLoading: PropTypes.bool,
    onOpenModal: PropTypes.func,
    onChangeFilter: PropTypes.func,
};

export default BookHistoryTable;
