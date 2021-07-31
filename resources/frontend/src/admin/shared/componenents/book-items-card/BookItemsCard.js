import React, {useState} from 'react';
import {Field} from 'redux-form';
import {Button, Table} from 'reactstrap';
import PropTypes from 'prop-types';
import './BookItemsCard.scss';
import CustomInput from '../../../../shared/components/CustomInput';
import InputFile from '../../../../admin/components/book-items/inputFile';
import {bookFormatOptions} from '../../../constants'
import {prepareCreatableObject} from "../../prepareArray";
import SelectCreatable from "../../../../shared/components/SelectCreatable";
import {getFormattedMessage, getFormattedOptions, mapCurrencyCode} from "../../../../shared/sharedMethod";
import {bookITemCreationWarning, bookCreationWarning} from "../../../../shared/custom-hooks";
import {connect} from "react-redux";
import {toggleModal} from '../../../../store/action/modalAction';
import BookItemForm from '../../../../admin/components/book-items/BookItemForm';
import Modal from '../../../../shared/components/Modal';
import { bookFormatConstant } from "../../../constants";

const BookItemsCard = (props) => {
    const { fields, meta: { error, submitFailed }, toggleModal, currency } = props;
    const [items, setItems] = useState([]);
    const [addItems, setAddItems] = useState([]);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);
    const [itemIndex, setItemIndex] = useState([]);
    const [bookItems, setbookItems] = useState(false);

    const onSaveBookItems = (formValues) => {
        setAddItems([...addItems, formValues]);
        toggleModal();
        setbookItems(false);
        fields.push(formValues);
    }

    const cardModalProps = {
        onSaveBookItems,
        onCancel: toggleModal,
        newBookItem: true,
        currency
    };

    const onAddSubFields = () => {
        setbookItems(true);
        toggleModal();
    };

    const onRemoveSubFields = (index) => {
        const tempArray = [...addItems];
        tempArray.splice(index, 1);
        setAddItems(tempArray);
    };

    const prepareModalOption = {
        title: getFormattedMessage('books.items.input.new-btn.label'),
        toggleModal,
    }

    const onChangeBookFormate = (index, option) => {
        if (option.value === 3) {
            setItemIndex([...itemIndex, index]);
        } else if (itemIndex.includes(index)) {
            setItemIndex(itemIndex.filter(item => item !== index));
        }
    }

    const renderFields = () => {
        return addItems && addItems.map((item, index) => (
            <tr key={index}>
                <td>
                    {item.edition}
                </td>
                <td className="book-items-card__format">
                    { item.format.name}
                </td>
                <td className="book-items-card__language">
                    {item.price ? item.price : '0.00'}
                </td>
                <td className="book-items-card__publisher">
                    {item.language.name}
                </td>
                <td className="book-items-card__publisher">
                    {item.publisher ? item.publisher.name : 'N/A' }
                </td>
                <td className="text-center">
                    <Button size="sm" color="danger" className="book-items-card__action-btn"
                            onClick={() => onRemoveSubFields(index, item)}>
                        <i className="cui-trash icon font-md"/>
                    </Button>
                </td>
            </tr>
        ))
    };

    return (
        <div className="book-items-card overflow-auto">
            <Table responsive size="md" className="table-multi-item-responsive">
                <thead>
                <tr>
                    <th className="book-items-card__item-header book-items-card__responsive">{getFormattedMessage('books.items.input.edition.label')}</th>
                    <th className="book-items-card__item-header book-items-card__responsive">{getFormattedMessage('books.items.select.format.label')}</th>
                    <th className="book-items-card__responsive">{getFormattedMessage('books.items.input.price.label')}</th>
                    <th className="book-items-card__item-header book-items-card__responsive">{getFormattedMessage('books.items.select.language.label')}</th>
                    <th className="book-items-card__responsive">{getFormattedMessage('books.items.select.publisher.label')}</th>
                    <th className="text-center">{getFormattedMessage('react-data-table.action.column')}</th>
                </tr>
                </thead>
                <tbody>
                {renderFields()}
                </tbody>
            </Table>
            <button type="button" className="btn btn-outline-primary" onClick={() => onAddSubFields()}>
                {getFormattedMessage('books.items.input.add-item-btn.label')}
            </button>
            {bookItems ? <Modal {...prepareModalOption} content={<BookItemForm {...cardModalProps}/>}/> : null}
            {submitFailed && error && <div className="text-danger mt-3">{error}</div>}
        </div>
    );
};

BookItemsCard.propTypes = {
    fields: PropTypes.object,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    currency: PropTypes.string,
    toggleModal: PropTypes.func,
};

export default connect(null, { toggleModal })(BookItemsCard);
