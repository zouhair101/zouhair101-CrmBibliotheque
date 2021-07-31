import React from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookRequestModal from './BookRequestModal';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {
    bookCirculationStatusConstant,
    bookFormatOptions,
    bookRequestStatus,
    bookRequestStatusOptions
} from "../../../admin/constants";
import BookRequestStatus from '../../../shared/book-request-status/BookRequestStatus';
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBookRequests} from "../../store/actions/bookRequestAction";
import {icon} from "../../../constants";

const BookRequests = (props) => {
    const { bookRequests, toggleModal, totalRecord, isLoading, fetchBookRequests } = props;
    const [isCreate, isEdit, isDelete, bookRequest, onOpenModal] = openModal();
    const cardModalProps = { bookRequest, isCreate, isEdit, isDelete, toggleModal };
    const bookFormats = getFormattedOptions(bookFormatOptions);

    const onChange = (filter) => {
        fetchBookRequests(filter, true);
    };

    const onClickModal = (isEdit, bookRequest = null, isDelete = false) => {
        onOpenModal(isEdit, bookRequest, isDelete);
        toggleModal();
    };

    const columns = [
        {
            name: getFormattedMessage('book-request.input.isbn.label'),
            selector: 'isbn',
            sortable: true,
            cell: row => <span>{row.isbn}</span>,
            minWidth: '200px'
        },
        {
            name: getFormattedMessage('books.table.book.column'),
            selector: 'book_name',
            sortable: true,
            cell: row => <span>{row.book_name}</span>,
        },
        {
            name: getFormattedMessage('book-request.input.edition.label'),
            selector: 'edition',
            sortable: true,
            cell: row => <span>{row.edition}</span>,
        },
        {
            name: getFormattedMessage('book-request.select.format.label'),
            selector: 'format',
            sortable: true,
            cell: row => {
                const format = bookFormats.find(format => format.id === row.format);
                if (format) {
                    return format.name;
                }
            }
        },
        {
            name: getFormattedMessage('book-request.count.label'),
            selector: 'request_count',
            sortable: true,
            center:true,
            cell: row => row.request_count
        },
        {
            name: getFormattedMessage('react-data-table.status.column'),
            selector: 'status',
            sortable: true,
            center:true,
            cell: row => <BookRequestStatus status={row.status}/>
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            right: true,
            cell: row => renderBookRequestAction(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const renderBookRequestAction = (row) => {
        switch (row.status) {
            case bookRequestStatus.APPROVED:
            case bookRequestStatus.PENDING:
                return <ModalAction onOpenModal={onClickModal} item={row} isHideDeleteIcon={true}/>;
            case bookRequestStatus.AVAILABLE:
            case bookRequestStatus.CANCEL:
            default:
                return '';
        }
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title="Books Request"/>
                <h5 className="page-heading">{getFormattedMessage('book-request.title')}</h5>
                <ProgressBar/>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={bookRequests} columns={columns} loading={isLoading}
                                            emptyStateMessageId="book-request.empty-state.title"
                                            emptyNotFoundStateMessageId="book-request.not-found.empty-state.title"
                                            totalRows={totalRecord}
                                            onChange={onChange} icon={(icon.BOOK_REQUEST)}/>
                            <BookRequestModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

BookRequests.propTypes = {
    adminBookRequests: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBookRequests: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { adminBookRequests, isLoading, totalRecord } = state;
    return { bookRequests: adminBookRequests, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchBookRequests, toggleModal })(BookRequests);
