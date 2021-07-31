import React from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookRequestModal from './BookRequestModal';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {bookFormatOptions} from "../../../admin/constants";
import BookRequestStatus from '../../../shared/book-request-status/BookRequestStatus';
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBookRequests} from "../../store/actions/bookRequestAction";
import {bookRequestConstants} from "../../../constants";
import {icon} from "../../../constants";

const BookRequests = (props) => {
    const { bookRequests, toggleModal, totalRecordMember, isLoading, fetchBookRequests } = props;
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

    const renderModalAction = (row) => {
        switch (row.status) {
            case bookRequestConstants.APPROVED:
            case bookRequestConstants.AVAILABLE:
                return <ModalAction onOpenModal={onClickModal} isHideEditIcon={true} isHideDeleteIcon={true}
                                    item={row}/>;
            default:
                return <ModalAction onOpenModal={onClickModal} item={row}/>
        }
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
            name: getFormattedMessage('books.radio.book.label'),
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
            name: getFormattedMessage('react-data-table.status.column'),
            selector: 'status',
            sortable: true,
            center: true,
            cell: row => <BookRequestStatus status={row.status}/>
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            right: true,
            cell: row => renderModalAction(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title="Books Request"/>
                <h5 className="page-heading">{getFormattedMessage('book-request.title')}</h5>
                <ProgressBar/>
                <div className="float-right">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('book-request.input.new-btn.label')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={bookRequests} columns={columns} loading={isLoading}
                                            emptyStateMessageId="book-request.empty-state.title"
                                            emptyNotFoundStateMessageId="books-request.not-found.empty-state.title"
                                            totalRows={totalRecordMember} onChange={onChange} icon={(icon.BOOK)}/>
                            <BookRequestModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

BookRequests.propTypes = {
    bookRequests: PropTypes.array,
    totalRecordMember: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBookRequests: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { bookRequests, isLoading, totalRecordMember } = state;
    return { bookRequests, isLoading, totalRecordMember };
};

export default connect(mapStateToProps, { fetchBookRequests, toggleModal })(BookRequests);
