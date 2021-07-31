import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Button} from 'reactstrap';
import {reduxForm, Field} from 'redux-form';
import PropTypes from 'prop-types';
import './BookSearch.scss';
import Radio from '../../../shared/components/Radio';
import Select from "../../../shared/components/Select";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {resetSearchBooks} from "../../store/actions/bookSearchAction";

const BookSearchForm = (props) => {
    const {
        books, authors, change, onSearchBook, resetSearchBooks, setSearch, handleSubmit, isAuthorSelected,
        isBookSelected, isDisabledSearch
    } = props;
    const [isAuthorChecked, setIsAuthorChecked] = useState(isAuthorSelected);
    const [isBookChecked, setIsBookChecked] = useState(isBookSelected);
    const [isDisabled, setIsDisabled] = useState(isDisabledSearch);

    const prepareParams = (item) => {
        if (isBookChecked && item) {
            return `id=${item.id}&search_by_book=${true}`
        } else if (isAuthorChecked && item) {
            return `id=${item.id}&search_by_author=${true}`
        }
    };

    const searchBook = (formValues) => {
        onSearchBook(prepareParams(formValues.item));
        setSearch(true);
    };

    const onSelectItem = () => {
        setIsDisabled(false);
    };

    const onCheckedBook = () => {
        change('item', null);
        setIsDisabled(true);
        setSearch(false);
        setIsBookChecked(!isBookChecked);
        setIsAuthorChecked(false);
        resetSearchBooks();
    };

    const onCheckedAuthor = () => {
        change('item', null);
        setIsDisabled(true);
        setSearch(false);
        setIsAuthorChecked(!isAuthorChecked);
        setIsBookChecked(false);
        resetSearchBooks();
    };

    const onResetSearch = () => {
        change('item', null);
        setIsDisabled(true);
        setSearch(false);
        resetSearchBooks();
    };

    return (
        <Row className="animated fadeIn flex-column">
            <div className="d-flex mb-3">
                <div className="flex-2 text-center">
                    <Col xs={12} className="book-form__filter-by text-center justify-content-center">
                        <span className="book-form__filter-by-label">{getFormattedMessage('books.search-by.label')}
                        </span>
                        <div className="ml-3">
                            <Field name="filter_by" label={getFormattedMessage('books.radio.book.label')}
                                   checked={isBookChecked} onChange={onCheckedBook} component={Radio}/>
                        </div>
                        <div className="ml-2">
                            <Field name="filter_by" label={getFormattedMessage('books.radio.author.label')}
                                   checked={isAuthorChecked} onChange={onCheckedAuthor} component={Radio}/>
                        </div>
                    </Col>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="flex-2 justify-content-center text-center">
                    <Col xs={12} className="text-center">
                        <div className="book-form__input-label">
                           <span>
                               {isBookChecked ? getFormattedMessage('books.select.book.label') :
                                   getFormattedMessage('books.select.author.label')}
                           </span>
                        </div>
                        <div className="book-form__input-book">
                            <Field name="item" options={isBookChecked ? books : authors}
                                   placeholder={isBookChecked ? 'books.select.book.placeholder' : 'books.select.author.placeholder'}
                                   onChange={onSelectItem} groupText={isBookChecked ? 'book' : 'user-circle-o'}
                                   component={Select} isSearchable={true}/>
                        </div>
                    </Col>
                    <Col xs={12} className="book-form__btn">
                        <Button onClick={handleSubmit(searchBook)} disabled={isDisabled} color="primary">
                            {getFormattedMessage('global.input.search-btn.label')}
                        </Button>
                        <Button className="ml-2" onClick={() => onResetSearch()}>
                            {getFormattedMessage('global.input.reset-btn.label')}
                        </Button>
                    </Col>
                </div>
            </div>
        </Row>
    )
};

BookSearchForm.propTypes = {
    books: PropTypes.array,
    authors: PropTypes.array,
    isAuthorSelected: PropTypes.bool,
    isBookSelected: PropTypes.bool,
    isDisabledSearch: PropTypes.bool,
    onSearchBook: PropTypes.func,
    resetSearchBooks: PropTypes.func,
    setSearch: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

const bookSearchForm = reduxForm({ form: 'bookSearchForm' })(BookSearchForm);
export default connect(null, { resetSearchBooks })(bookSearchForm);
