import React from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookLanguageModal from './BookLanguageModal';
import './BookLanguages.scss';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {icon} from "../../../constants";

const BookLanguages = (props) => {
    const { bookLanguages, toggleModal, totalRecord, isLoading, fetchBookLanguages } = props;
    const [isCreate, isEdit, isDelete, bookLanguage, onOpenModal] = openModal();
    const cardModalProps = { bookLanguage, isCreate, isEdit, isDelete, toggleModal };

    const onChange = (filter) => {
        fetchBookLanguages(filter, true);
    };

    const onClickModal = (isEdit, bookLanguage = null, isDelete = false) => {
        onOpenModal(isEdit, bookLanguage, isDelete);
        toggleModal();
    };

    const columns = [
        {
            name: getFormattedMessage('book-languages.input.code.label'),
            selector: 'language_code',
            sortable: true,
            cell: row => <span>{row.language_code}</span>,
            minWidth: '150px'
        },
        {
            name: getFormattedMessage('react-data-table.name.column'),
            selector: 'language_name',
            sortable: true,
            cell: row => <span>{row.language_name}</span>,
            minWidth: '250px'
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            right: true,
            cell: row => <ModalAction onOpenModal={onClickModal} item={row}/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title="Book Languages"/>
                <ProgressBar/>
                <h5 className="page-heading">{getFormattedMessage('book-languages.title')}</h5>
                <div className="float-right">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary">
                        {getFormattedMessage('book-languages.input.new-btn.label')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={bookLanguages} columns={columns} loading={isLoading}
                                            emptyStateMessageId="book-languages.empty-state.title"
                                            emptyNotFoundStateMessageId="book-languages.not-found.empty-state.title"
                                            totalRows={totalRecord} onChange={onChange} icon={(icon.BOOK_LANGUAGE)}/>
                            <BookLanguageModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

BookLanguages.propTypes = {
    bookLanguages: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBookLanguages: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { bookLanguages, isLoading, totalRecord } = state;
    return { bookLanguages, totalRecord, isLoading };
};

export default connect(mapStateToProps, { fetchBookLanguages, toggleModal })(BookLanguages);
