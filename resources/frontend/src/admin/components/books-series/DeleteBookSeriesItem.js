import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";

const DeleteBookSeriesItem = (props) => {
    const { fields, seriesItems, items, setItems, index, setIndex, toggleModal } = props;
    const content = <>{getFormattedMessage('modal.delete.message')}&nbsp;"{`${ seriesItems && seriesItems[index].book_id
    && seriesItems[index].book_id.name ? seriesItems[index].book_id.name : seriesItems[index].sequence}`}" ?</>;
    const title = getFormattedMessage('books-series.items.modal.delete.title');
    const onDeleteBookSeries = () => {
        const valueArray = [...items];
        valueArray.splice(index, 1);
        setItems(valueArray);
        fields.remove(index);
        setIndex(null);
        toggleModal();
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookSeries} onCancel={toggleModal}/>}
                  content={content} title={title}/>;
};

DeleteBookSeriesItem.propTypes = {
    bookSeries: PropTypes.object,
    items: PropTypes.array,
    fields: PropTypes.array,
    index: PropTypes.number,
    setItems: PropTypes.func,
    setIndex: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default DeleteBookSeriesItem;
