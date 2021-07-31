import React, {useEffect, Fragment} from 'react';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookItemModal from './BookItemModal';
import BookItem from './BookItemTable';
import './BookItems.scss';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {sortAction} from '../../../store/action/sortAction';
import {toggleModal} from '../../../store/action/modalAction';
import {setBookItems} from '../../store/actions/bookItemAction';

const BookItems = (props) => {
    const {
        bookLanguages, publishers, bookItemList, bookItems,
        sortAction, sortObject, toggleModal, setBookItems, bookId, isParentToggle, setIsParentToggle, currency
    } = props;
    const [isCreate, isEdit, isDelete, bookItem, onOpenModal] = openModal();
    const cardModalProps = {
        bookItem,
        bookLanguages,
        publishers,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
        bookItems,
        bookId,
        currency
    };

    useEffect(() => {
        setBookItems([...bookItemList]);
    }, []);

    const onClickModal = (isEdit, bookItem = null, isDelete = false) => {
        onOpenModal(isEdit, bookItem, isDelete);
        setIsParentToggle(false);
        toggleModal();
    };

    const cardBodyProps = { sortAction, sortObject, bookItems, bookLanguages, publishers, onClickModal, currency };

    return (
        <Fragment>
            {bookItems.length > 0 ? <BookItem {...cardBodyProps}/> :
                <EmptyComponent isShort={true} title={getFormattedMessage('books.items.empty-state.title')}/>}
            <Button className="pull-right mt-3" onClick={() => onClickModal(false)} size="md" color="primary">
                {getFormattedMessage('books.items.input.new-btn.label')}
            </Button>
            {!isParentToggle ? <BookItemModal {...cardModalProps}/> : null}
        </Fragment>
    );
};

BookItems.propTypes = {
    bookItem: PropTypes.object,
    sortObject: PropTypes.object,
    bookItemList: PropTypes.array,
    bookItems: PropTypes.array,
    bookLanguages: PropTypes.array,
    publishers: PropTypes.array,
    bookId: PropTypes.number,
    searchText: PropTypes.string,
    currency: PropTypes.string,
    isLoading: PropTypes.bool,
    isParentToggle: PropTypes.bool,
    setBookItems: PropTypes.func,
    sortAction: PropTypes.func,
    toggleModal: PropTypes.func,
    setIsParentToggle: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { bookItems, searchText, sortObject, isLoading, currency } = state;
    let bookItemsArray = Object.values(bookItems);
    if (searchText) {
        bookItemsArray = searchFilter(bookItemsArray, searchText);
    }
    if (sortObject) {
        bookItemsArray = sortFilter(bookItemsArray, sortObject);
    }
    return { bookItems: bookItemsArray, sortObject, isLoading, currency };
};

export default connect(mapStateToProps, { setBookItems, sortAction, toggleModal })(BookItems);
