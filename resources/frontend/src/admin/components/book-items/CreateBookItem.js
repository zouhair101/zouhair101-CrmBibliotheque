import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BookItemForm from './BookItemForm';
import prepareFormData from '../../shared/prepareBookItemData';
import Modal from '../../../shared/components/Modal';
import {addBookItem} from '../../store/actions/bookItemAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';

const CreateBookItem = (props) => {
    const { bookItems, toggleModal, addBookItem, bookId, currency } = props;

    const onSaveBookItems = (formValues) => {
        addBookItem(prepareFormData(formValues), bookId);
    };

    const prepareFormOption = {
        onSaveBookItems,
        onCancel: toggleModal,
        currency
    };

    return <Modal {...props} content={<BookItemForm{...prepareFormOption}/>}/>
};

CreateBookItem.propTypes = {
    bookItems: PropTypes.array,
    bookId: PropTypes.number,
    addBookItem: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addBookItem, fetchPublishers, fetchBookLanguages })(CreateBookItem);
