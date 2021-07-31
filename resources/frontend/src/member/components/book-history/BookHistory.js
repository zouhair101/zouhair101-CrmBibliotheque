import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import BookHistoryTable from "./BookHistoryTable";
import UnReserveBook from "./UnReserveBook";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBooksHistory} from '../../store/actions/bookHistoryAction';

const BookHistory = props => {
    const [history, setHistory] = useState(null);
    const { bookHistory, fetchBooksHistory, isLoading, toggleModal, totalRecordMember } = props;

    const cardModalProps = {
        bookHistory: history,
        toggleModal,
    };

    const onChangeFilter = (filter) => {
        fetchBooksHistory(filter);
    };

    const onOpenModal = (bookItem = null) => {
        setHistory(bookItem);
        toggleModal();
    };

    const cardBodyProps = {
        bookHistory,
        onOpenModal,
        onChangeFilter,
        totalRecordMember,
        isLoading
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Book History"/>
                <h5 className="page-heading">{getFormattedMessage('book-history.title')}</h5>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <BookHistoryTable {...cardBodyProps}/>
                            <UnReserveBook {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    )
};

BookHistory.propTypes = {
    history: PropTypes.object,
    bookHistory: PropTypes.array,
    totalRecordMember: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBooksHistory: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { bookHistory, isLoading, totalRecordMember } = state;
    return {
        bookHistory,
        isLoading,
        totalRecordMember
    }
};

export default connect(mapStateToProps, { fetchBooksHistory, toggleModal })(BookHistory);
