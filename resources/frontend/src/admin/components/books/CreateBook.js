import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import PropTypes from 'prop-types';
import BookForm from './BookForm';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import prepareFormData from '../../shared/prepareBookFormData';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage, prepareFullNames} from "../../../shared/sharedMethod";
import {prepareBookLanguage, prepareCreatableObject} from "../../shared/prepareArray";
import {addBook} from '../../store/actions/bookAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import {fetchGenres} from '../../store/actions/genreAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchTags} from '../../store/actions/tagAction';

const CreateBook = (props) => {
    const {
        authors, genres, tags, publishers, bookLanguages, history, fetchAuthors, fetchGenres,
        fetchTags, fetchPublishers, fetchBookLanguages, addBook, isLoading, currency
    } = props;

    useEffect(() => {
        fetchAuthors();
        fetchPublishers();
        fetchGenres();
        fetchBookLanguages(true);
        fetchTags();
    }, []);

    const onSaveBook = (formValues) => {
        addBook(prepareFormData(formValues), history);
    };

    const goBack = () => {
        history.goBack();
    };

    const prepareFormOption = {
        authors,
        publishers,
        tags,
        genres,
        bookLanguages,
        currency,
        onSaveBook,
        onCancel: goBack
    };

    return (
        <div className="animated fadeIn">
            {isLoading ? <ProgressBar/> : null}
            <HeaderTitle title="New Book"/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading">{getFormattedMessage('books.input.new-btn.label')}</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <BookForm {...prepareFormOption}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

CreateBook.propTypes = {
    history: PropTypes.object,
    authors: PropTypes.array,
    genres: PropTypes.array,
    tags: PropTypes.array,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    currency: PropTypes.string,
    isLoading: PropTypes.bool,
    addBook: PropTypes.func,
    fetchAuthors: PropTypes.func,
    fetchGenres: PropTypes.func,
    fetchTags: PropTypes.func,
    fetchBookLanguages: PropTypes.func,
    fetchPublishers: PropTypes.func
};

const mapStateToProps = (state) => {
    const { isLoading, authors, publishers, tags, bookLanguages, genres, currency } = state;
    return {
        isLoading,
        currency,
        authors: prepareCreatableObject(prepareFullNames(authors)),
        publishers: prepareCreatableObject(publishers),
        tags: prepareCreatableObject(tags),
        bookLanguages: prepareCreatableObject(prepareBookLanguage(bookLanguages)),
        genres: prepareCreatableObject(genres)
    }
};

export default connect(mapStateToProps, {
    addBook,
    fetchAuthors,
    fetchGenres,
    fetchTags,
    fetchBookLanguages,
    fetchPublishers
})(CreateBook);
