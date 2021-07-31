import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import PropTypes from 'prop-types';
import BookSeriesForm from './BookSeriesForm';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {editBookSeries, fetchBookSeries} from '../../store/actions/bookSeriesAction';

const EditBookSeries = (props) => {
    const { bookSeries, history, editBookSeries, fetchBookSeries } = props;

    useEffect(() => {
        fetchBookSeries(+props.match.params.id);
    }, []);

    const onSaveBookSeries = (formValues) => {
        editBookSeries(bookSeries.id, formValues, history);
    };

    const goBack = () => {
        history.goBack();
    };

    if (!bookSeries) {
        return <ProgressBar/>;
    }

    const { title, series_items } = bookSeries;
    const changAbleFields = { title, series_items };
    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: goBack,
        initialValues: changAbleFields,
    };

    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle title={'Edit Books Series'}/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark"> {getFormattedMessage('books-series.modal.edit.title')}</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <BookSeriesForm {...prepareFormOption}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

EditBookSeries.propTypes = {
    bookSeries: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    editBookSeries: PropTypes.func,
    fetchBookSeries: PropTypes.func,
};

const mapStateToProps = (state, ownProp) => {
    const { isLoading, booksSeries, } = state;
    return {
        isLoading,
        bookSeries: booksSeries[ownProp.match.params.id]
    }
};

export default connect(mapStateToProps, { editBookSeries, fetchBookSeries })(EditBookSeries);
