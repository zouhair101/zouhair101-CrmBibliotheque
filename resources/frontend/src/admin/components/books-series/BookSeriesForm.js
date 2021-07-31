import React, {useState, useEffect, createRef} from 'react';
import {Col, Row, Button, Table} from 'reactstrap';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import bookSeriesValidate from './bookSeriesValidate';
import DeleteBookSeriesItem from './DeleteBookSeriesItem';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import CustomInput from '../../../shared/components/CustomInput';
import Select from "../../../shared/components/Select";
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {fetchBooks} from '../../store/actions/bookAction';
import {toggleModal} from "../../../store/action/modalAction";
import './BooksSeries.scss';

const getItems = seriesItems =>
    seriesItems.map((item, key) => ({
        id: `item-${key}`,
        sequence: item.sequence,
        book_id: item.book.id
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const getItemStyle = (draggableStyle) => ({
    userSelect: 'none',
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({});

const filteredBooks = (books, seriesItems) => {
    if (!seriesItems) {
        return books;
    }
    return books.filter(o => !seriesItems.find(o2 => {
        if (o2.book && o2.book.id) {
            return o.id === +o2.book.id
        }
    }));
};
const BookSeriesForm = props => {
    const {
        initialValues, books, change, seriesItems, toggleModal, initialize,
        onSaveBookSeries, handleSubmit, fetchBooks
    } = props;
    const [items, setItems] = useState(getItems(initialValues ? initialValues.series_items : [{
        id: 1,
        sequence: 1,
        book: {id: null}
    }]));
    const inputRef = createRef();

    useEffect(() => {
        fetchBooks({}, null, true);
        inputRef.current.focus();
        if (!initialValues) {
            initialize({series_items: [{sequence: 1}]});
        }
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const item = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        const seriesItem = reorder(
            seriesItems,
            result.source.index,
            result.destination.index
        );
        let array = [];
        seriesItem.forEach((item, index) => {
            seriesItems.forEach((i) => {
                if (item.sequence === +i.sequence) {
                    array.push({sequence: index + 1, book: i.book})
                }
            });
        });
        setItems(item);
        change('series_items', array);
    };

    const prepareFormData = (formValues) => {
        formValues.series_items.forEach((seriesItem, index) => {
            seriesItem.sequence = index + 1;
            seriesItem.book_id = seriesItem.book.id;
        });
        delete formValues.book;
        return formValues;
    };

    const onSave = formValues => {
        onSaveBookSeries(prepareFormData(formValues));
    };

    return (
        <Row className="animated fadeIn m-none m-sm-3">
            <Col xs={12}>
                <Field name="title" label="books-series.input.title.label" required inputRef={inputRef}
                       groupText="television" component={InputGroup}/>
            </Col>
            <Col xs={12} className="mt-3">
                <h5>{getFormattedMessage('books-series.items.title')}</h5>
                <FieldArray name="series_items" component={renderBookSeriesItems}
                            books={filteredBooks(books, seriesItems, initialValues)} change={change}
                            onDragEnd={onDragEnd} setItems={setItems} items={items} toggleModal={toggleModal}
                            seriesItems={seriesItems}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};
const renderBookSeriesItems = ({fields, meta: {error, submitFailed}, onDragEnd, change, items, setItems, books, toggleModal, seriesItems}) => {
    const [index, setIndex] = useState(null);
    const onAddSubFields = () => {
        setItems([...items, {id: `item-${items.length + 1}`, sequence: items.length + 1, book_id: null}]);
        return fields.push({sequence: items.length + 1, book_id: null});
    };
    const onRemoveSubFields = (index) => {
        setIndex(index);
        toggleModal();
    };
    const cardModalProps = {fields, seriesItems, items, setItems, index, setIndex, toggleModal};
    if (fields.length === 0) {
        return (
            <div>
                <EmptyComponent isShort={true} title={getFormattedMessage('books-series.items.empty-state.title')}/>
                <button type="button" className="btn btn-outline-primary mt-3" onClick={() => onAddSubFields()}>
                    {getFormattedMessage('books-series.items.input.add-item-btn.label')}
                </button>
            </div>
        )
    }
    return (
        <div className="overflow-auto">
            <Table responsive size="md">
                <thead>
                <tr>
                    <th className="header-responsive">{getFormattedMessage('books-series.items.input.sequence.label')}</th>
                    <th className="book-form__item-header header-responsive">{getFormattedMessage('books-series.items.select.book-name.label')}</th>
                    <th className="text-center">{getFormattedMessage('react-data-table.action.column')}</th>
                </tr>
                </thead>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <tbody ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}
                                   {...provided.droppableProps}
                            >
                            {fields.map((item, index) => {
                                return (
                                    <Draggable key={items[index].id} draggableId={items[index].id} index={index}>
                                        {(provided, snapshot) => (
                                            <tr ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps} style={getItemStyle(
                                                provided.draggableProps.style,
                                                snapshot.isDragging
                                            )}>
                                                <td style={{width: '720px'}}>
                                                    <Field name={`${item}.sequence`} readOnly={true}
                                                           placeholder="books-series.items.input.sequence.label"
                                                           groupText="file-text" component={CustomInput}/>
                                                </td>
                                                <td style={{width: '720px'}}>
                                                    <Field name={`${item}.book`} required options={books}
                                                           placeholder="books-series.items.select.book-name.placeholder"
                                                           groupText="book" component={Select} isSearchable={true}/>
                                                </td>
                                                <td className="text-center">
                                                    <Button size="sm" color="danger" style={{marginTop: '10px'}}
                                                            onClick={() => onRemoveSubFields(index, item)}>
                                                        <i className="cui-trash icon font-md"/>
                                                    </Button>
                                                </td>
                                                {provided.placeholder}
                                            </tr>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                            {index !== null ? <DeleteBookSeriesItem {...cardModalProps}/> : null}
                            </tbody>
                        )}
                    </Droppable>
                </DragDropContext>
            </Table>
            <button type="button" className="btn btn-outline-primary" onClick={() => onAddSubFields()}>
                {getFormattedMessage('books-series.items.input.add-item-btn.label')}
            </button>
            {submitFailed && error && <div className="text-danger mt-3">{error}</div>}
        </div>
    )
};

BookSeriesForm.propTypes = {
    initialValues: PropTypes.object,
    books: PropTypes.array,
    seriesItems: PropTypes.array,
    fetchBooks: PropTypes.func,
    onSaveBookSeries: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    initialize: PropTypes.func,
    toggleModal: PropTypes.func,
};

const bookSeriesForm = reduxForm({form: 'bookSeriesForm', validate: bookSeriesValidate})(BookSeriesForm);
const selector = formValueSelector('bookSeriesForm');
const mapStateToProps = (state) => {
    const {books} = state;
    return {seriesItems: selector(state, 'series_items'), books}
};

export default connect(mapStateToProps, {fetchBooks, toggleModal})(bookSeriesForm);
