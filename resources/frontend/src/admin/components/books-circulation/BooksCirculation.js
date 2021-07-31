import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookCirculationModal from './BookCirculationModal';
import './BooksCirculation.scss';
import {Routes, icon} from "../../../constants";
import {bookCirculationFilterOptions, storageKey, bookCirculationStatusConstant} from "../../constants";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import {dateFormatter, getFormattedMessage, getFormattedOptions} from '../../../shared/sharedMethod';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import BookStatus from "../../../shared/book-status/book-status";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBooksCirculation, excelFile} from '../../store/actions/bookCirculationAction';
import MailSend from './MailSend';
import {Dropdown} from 'react-bootstrap';

const BooksCirculation = (props) => {
    const { booksCirculation, fetchBooksCirculation, toggleModal, history, isLoading, totalRecord, excelFile } = props;
    const [filterObject, setFilterObject] = useState(null);
    const [isCreate, isEdit, isDelete, bookCirculation, onOpenModal] = openModal();
    const cardModalProps = { bookCirculation, filterObject, isCreate, isEdit, isDelete, toggleModal };
    const bookCirculationStatusFilter = getFormattedOptions(bookCirculationFilterOptions);

    const onChange = (filter) => {
        setFilterObject(filter);
        fetchBooksCirculation(filter, () => {
        });
    };

    const onClickModal = (isEdit, bookCirculation = null, isDelete = false) => {
        onOpenModal(isEdit, bookCirculation, isDelete);
        toggleModal();
    };

    const gotToBookHistoryDetail = (bookCirculationId) => {
        history.push(`${Routes.BOOKS_CIRCULATION + bookCirculationId}/details`);
    };

    const getStoredFilterKey = () => {
        const item = JSON.parse(localStorage.getItem(storageKey.BOOK_CIRCULATION));
        if (item) {
            const bookCirculation = bookCirculationStatusFilter.find(bookCirculation => bookCirculation.id === item.id);
            if (bookCirculation) {
                return bookCirculation;
            }
        }
        return bookCirculationStatusFilter[0];
    };

    const onClickExcelFile = (filterObject) => {
        filterObject.limit = '';
        filterObject.skip = '';
        excelFile(filterObject, (res) => {
            if(res.url) {
                window.open(res.url, "_self")
            }
        });
    };

    const columns = [
        {
            name: getFormattedMessage('books-circulation.select.book.label'),
            selector: 'name',
            sortable: true,
            wrap: true,
            cell: row => row.name = row.book_item.book.name
        },
        {
            name: getFormattedMessage('books-circulation.select.book-item.label'),
            selector: 'book_code',
            width: '140px',
            sortable: true,
            cell: row => row.book_code = row.book_item.book_code
        },
        {
            name: getFormattedMessage('books-circulation.select.member.label'),
            selector: 'member_name',
            width: '140px',
            sortable: true,
            cell: row => <span>{row.member.first_name + ' ' + row.member.last_name}</span>
        },
        {
            name: getFormattedMessage('profile.input.phone.label'),
            selector: 'phone',
            width: '140px',
            sortable: true,
            cell: row => <span>{row.member.phone ? row.member.phone : 'N/A'}</span>
        },
        {
            name: getFormattedMessage('books-circulation.table.issue-date.column'),
            selector: 'issued_on',
            width: '160px',
            sortable: true,
            cell: row => <span>{row.issued_on ? dateFormatter(row.issued_on) : 'N/A'}</span>
        },
        {
            name: getFormattedMessage('books-circulation.table.return-date.column'),
            selector: 'return_date',
            width: '160px',
            sortable: true,
            cell: row => <span>{row.return_date ? dateFormatter(row.return_date) : 'N/A'} </span>
        },
        {
            name: getFormattedMessage('react-data-table.status.column'),
            width: '100px',
            selector: 'status',
            center: true,
            cell: row => <BookStatus status={row.status} item={row}/>
        },
        {
            name: getFormattedMessage('books-circulation.table.mail.column'),
            width: '100px',
            selector: 'return_due_date',
            center: true,
            cell: row => <MailSend return_due_date={row.return_due_date} book_item_id={row.book_item_id} status={row.status}/>
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            width: '160px',
            right: true,
            cell: row => <ModalAction isHideDeleteIcon={row.status === bookCirculationStatusConstant.BOOK_RETURNED ||
                                row.status === bookCirculationStatusConstant.BOOK_UN_RESERVED ? false : true}
                                isHideDetailIcon={false}
                                goToDetailScreen={gotToBookHistoryDetail} onOpenModal={onClickModal} item={row}/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Books Circulation"/>
                <h5 className="page-heading">{getFormattedMessage('books-circulation.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle className="btn btn-primary ml-2" id="dropdown-basic" >
                            {getFormattedMessage('react-data-table.action.column')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => onClickModal(false)}>
                                {getFormattedMessage('books-circulation.input.new-btn.label')}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => onClickExcelFile(filterObject)}>
                                {getFormattedMessage('books-circulation.export-excel.label')}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={booksCirculation} isShowFilterField isShowDateRangeField
                                            emptyStateMessageId="books-circulation.empty-state.title"
                                            emptyNotFoundStateMessageId="books-circulation.not-found.empty-state.title"
                                            filterKeyName={storageKey.BOOK_CIRCULATION}
                                            filterOptions={bookCirculationStatusFilter} filterKey={getStoredFilterKey()}
                                            columns={columns} loading={isLoading} totalRows={totalRecord}
                                            onChange={onChange} icon={(icon.BOOK_CIRCULATION)}/>
                            <BookCirculationModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

BooksCirculation.propTypes = {
    history: PropTypes.object,
    booksCirculation: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBooksCirculation: PropTypes.func,
    toggleModal: PropTypes.func,
    excelFile: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { booksCirculation, isLoading, totalRecord } = state;
    return { booksCirculation, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchBooksCirculation: fetchBooksCirculation, toggleModal, excelFile })(BooksCirculation);
