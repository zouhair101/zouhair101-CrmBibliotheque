import React, {useState, useEffect} from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DeleteBookSeries from './DeleteBookSeries';
import BookSeries from './BookSeriesTable';
import './BooksSeries.scss';
import CustomSearchField from '../../../shared/components/CustomSearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {fetchBooksSeries} from '../../store/actions/bookSeriesAction';
import {toggleModal} from '../../../store/action/modalAction';
import {sortAction} from '../../../store/action/sortAction';
import {icon} from "../../../constants";

const BooksSeries = (props) => {
    const {
        booksSeries, fetchBooksSeries,
        sortAction, sortObject, toggleModal, history, searchText
    } = props;
    const [bookSeries, setBookSeries] = useState(null);
    const cardModalProps = { bookSeries, toggleModal };

    useEffect(() => {
        fetchBooksSeries();
    }, []);

    const onOpenModal = (bookSeries = null) => {
        setBookSeries(bookSeries);
        toggleModal();
    };

    const cardBodyProps = { sortAction, sortObject, booksSeries, onOpenModal, history };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Books Series"/>
                <h5 className="page-heading">{getFormattedMessage('books-series.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Link to="/app/admin/books-series/new" size="md" className="btn btn-primary ml-2">
                        {getFormattedMessage('books-series.input.new-btn.label')}
                    </Link>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-end mb-2">
                            {booksSeries.length > 0 || searchText ? <CustomSearchField/> : null }
                            </div>
                            {booksSeries.length > 0 ? <BookSeries {...cardBodyProps}/> :
                                <EmptyComponent title={searchText ? getFormattedMessage('books-series.not-found.empty-state.title') :
                                        getFormattedMessage('books-series.empty-state.title')}
                                    icon={(icon.BOOK_SERIES)}/>}
                            <DeleteBookSeries {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

BooksSeries.propTypes = {
    sortObject: PropTypes.object,
    history: PropTypes.object,
    booksSeries: PropTypes.array,
    searchText: PropTypes.string,
    fetchBooksSeries: PropTypes.func,
    sortAction: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { booksSeries, searchText, sortObject } = state;
    let booksSeriesArray = Object.values(booksSeries);
    if (searchText) {
        const filterKeys = ['title'];
        booksSeriesArray = searchFilter(booksSeriesArray, searchText, filterKeys);
    }
    if (sortObject) {
        booksSeriesArray = sortFilter(booksSeriesArray, sortObject);
    }
    return { booksSeries: booksSeriesArray, sortObject, searchText };
};

export default connect(mapStateToProps, { fetchBooksSeries, sortAction, toggleModal })(BooksSeries);
