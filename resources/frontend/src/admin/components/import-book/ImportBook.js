import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import PropTypes from 'prop-types';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import ImportBookForm from './ImportBookForm';
import prepareFormData from '../../shared/prepareBookFormData';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage, prepareFullNames} from "../../../shared/sharedMethod";
import {prepareBookLanguage} from "../../shared/prepareArray";
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchTags} from '../../store/actions/tagAction';
import {clearImportBook} from "../../store/actions/importBookAction";
import {addBook} from "../../store/actions/bookAction";
import {prepareCreatableObject} from "../../shared/prepareArray";
import {fetchAuthors} from '../../store/actions/authorAction';
import {fetchGenres} from '../../store/actions/genreAction';

const ImportBook = (props) => {
    const {
        authors, publishers, tags, bookLanguages, genres, isLoading, clearImportBook,
        history, addBook, fetchAuthors, fetchPublishers, fetchGenres, fetchBookLanguages, fetchTags
    } = props;

    useEffect(() => {
        clearImportBook();
        fetchAuthors();
        fetchPublishers();
        fetchGenres();
        fetchBookLanguages(true);
        fetchTags();
    }, []);

    const onImportBook = (formValues) => {
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
        onImportBook,
        onCancel: goBack,
    };

    return (
        <div className="animated fadeIn">
            {isLoading ? <ProgressBar/> : null}
            <HeaderTitle title="Import Book"/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading">{getFormattedMessage('books.input.import-btn.label')}</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <ImportBookForm {...prepareFormOption}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

ImportBook.propTypes = {
    history: PropTypes.object,
    authors: PropTypes.array,
    genres: PropTypes.array,
    tags: PropTypes.array,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    isLoading: PropTypes.bool,
    addBook: PropTypes.func,
    fetchAuthors: PropTypes.func,
    fetchGenres: PropTypes.func,
    fetchTags: PropTypes.func,
    fetchBookLanguages: PropTypes.func,
    fetchPublishers: PropTypes.func,
    clearImportBook: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { isLoading, authors, publishers, tags, bookLanguages, genres } = state;
    return {
        isLoading,
        authors: prepareCreatableObject(prepareFullNames(authors)),
        publishers: prepareCreatableObject(publishers),
        tags: prepareCreatableObject(tags),
        bookLanguages: prepareCreatableObject(prepareBookLanguage(Object.values(bookLanguages))),
        genres: prepareCreatableObject(genres),
    }
};

export default connect(mapStateToProps, {
    addBook,
    fetchAuthors,
    fetchGenres,
    fetchTags,
    fetchBookLanguages,
    fetchPublishers,
    clearImportBook,
})(ImportBook);
