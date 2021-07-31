import React from 'react';
import Modal from '../../../shared/components/Modal';
import {publicImagePath} from "../../../appConstant";

const HomeModal = (props) => {
    const {toggleModal, isToggle, book} = props;

    if (book === null) {
        return '';
    }
    const content = (
        <>
            <div className="d-flex flex-column flex-lg-row">
                <div className="book-detail-modal__media">
                    <img alt={book.image_path} src={book.image_path ? book.image_path : publicImagePath.BOOK_AVATAR}
                         className="card-img"/>
                </div>
                <div className="pl-0 pl-lg-5">
                    <div className="d-flex mb-2">
                        <div className="book-detail-modal__detail-title">Description</div>
                        <div className="text-description">
                            {book.description}
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="book-detail-modal__detail-title">Authors</div>
                        <div className="text-description">{book.authors_name}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="book-detail-modal__detail-title">Genres</div>
                        <div className="text-description">{book.genres_name}</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="book-detail-modal__detail-title">ISBN</div>
                        <div className="text-description">{book.isbn}</div>
                    </div>
                    {book.url !== null ?
                        <div className="d-flex mb-2">
                            <div className="book-detail-modal__detail-title">URL</div>
                            <div className="text-description">
                                <a target="_blank" href={book.url}>
                                    more detail...
                                </a>
                            </div>
                        </div> : ''
                    }
                </div>
            </div>
        </>
    );
    const modalOptions = {
        title: book ? book.name : '',
        content,
        className: 'book-detail-modal modal-lg',
        toggleModal
    };

    return isToggle ? <Modal {...modalOptions}/> : null;
};

export default HomeModal;
