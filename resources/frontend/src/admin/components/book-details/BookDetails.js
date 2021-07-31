import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './BookDetails.scss';
import BookDetailsModal from './BookDetailsModal';
import BookItems from '../book-items/BookItems';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import {getFormattedMessage, prepareFullNames} from "../../../shared/sharedMethod";
import {fetchBook} from '../../store/actions/bookAction';
import {toggleModal} from '../../../store/action/modalAction';
import Viewer from 'react-viewer';

const BookDetail = props => {
    const {book, toggleModal, history, fetchBook, match} = props;
    const [isParentToggle, setIsParentToggle] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const cardModalProps = {book, toggleModal, isToggle};
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetchBook(+match.params.id);
    }, []);

    if (!book || !book.genres) {
        return null;
    }

    const onOpenModal = () => {
        setIsToggle(true);
        setIsParentToggle(true);
        toggleModal();
    };

    const goBack = () => {
        history.goBack();
    };

    const bookItemFormOptions = {
        bookItemList: book.items,
        bookId: book.id,
        goBack,
        isParentToggle,
        setIsParentToggle,
    };

    const imageUrl = book.image_path ? book.image_path : publicImagePath.BOOK_AVATAR;

    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle title="Book-Details"/>
            <Row>
                <Col sm={12} className="mb-2 d-block d-sm-flex justify-content-between">
                    <h5 className="page-heading w-100">{book.name}</h5>
                    <div className="d-block d-sm-flex">
                        <Button className="mr-2" color="primary" onClick={() => onOpenModal()}>
                            {getFormattedMessage('books.edit-book-details.title')}
                        </Button>
                        <Button className="float-right" onClick={() => goBack()}>{getFormattedMessage('global.input.back-btn.label')}</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row className="book-detail-row no-gutters">
                                    <div className="book-image-container">
                                        <div className="book-image-holder">
                                            <div>
                                                <img onClick={() => {
                                                    setVisible(true);
                                                }} src={imageUrl} height="250" alt={imageUrl}/>
                                                <Viewer changeable={false} drag={false} disableMouseZoom={true}
                                                        loop={false} zIndex={1100} scalable={false}
                                                        noNavbar={true} visible={visible}
                                                        onClose={() => {
                                                    setVisible(false);
                                                }} images={[{src: imageUrl, alt: ''}]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="book-detail">
                                        <div className="book-detail__item-container">
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-isbn-heading">
                                                     {getFormattedMessage('books.edit-book-details.table.isbn.column')}
                                                </span>
                                                <span>{book.isbn}</span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-genre-heading">
                                                    {getFormattedMessage('books.edit-book-details.table.genres.column')}
                                                </span>
                                                <span>
                                                    {book.genres.map((({name}) => name)).join(',  ')}
                                                </span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-authors-heading">
                                                  {getFormattedMessage('books.edit-book-details.table.authors.column')}
                                                </span>
                                                <span>
                                                    {prepareFullNames(book.authors).map((({name}) => name)).join(',  ')}
                                                </span>
                                            </div>
                                            {book.tags.length > 0 ?
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-tags-heading">
                                                    {getFormattedMessage('books.edit-book-details.table.tags.column')}
                                                    </span>
                                                    <span>
                                                    {book.tags.map((({name}) => name)).join(',  ')}
                                                </span>
                                                </div> : null
                                            }
                                            {book.url ?
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-url-heading">
                                                    {getFormattedMessage('books.input.url.label')}
                                                    </span>
                                                    <span>
                                                       <a target="_blank" href={book.url}>
                                                            {book.url}
                                                        </a>
                                                     </span>
                                                </div> : null
                                            }
                                            {book.description ?
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-desc-heading">
                                                        {getFormattedMessage('books.input.description.label')}
                                                    </span>
                                                    <span className="book-detail__item-desc-text">
                                                    {book.description}
                                                    </span>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                </Row>
                                <div className={book.description ? 'mt-3' : 'mt-5'}>
                                    <h5 className="mb-3">{getFormattedMessage('books.items.title')}</h5>
                                    <BookItems {...bookItemFormOptions}/>
                                </div>
                                {isParentToggle ? <BookDetailsModal {...cardModalProps}/> : null}
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

BookDetail.propTypes = {
    book: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    isLoading: PropTypes.bool,
    isToggle: PropTypes.bool,
    fetchBook: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state, ownProp) => {
    const {books, isToggle} = state;
    return {
        book: books.find(book => book.id === +ownProp.match.params.id), isToggle
    }
};
export default connect(mapStateToProps, {
    fetchBook,
    toggleModal,
})(BookDetail);
