import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import PropTypes from 'prop-types';
import BookSeriesForm from './BookSeriesForm';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {addBookSeries} from '../../store/actions/bookSeriesAction';

const CreateBookSeries = (props) => {
    const { history, addBookSeries } = props;

    const onSaveBookSeries = (formValues) => {
        addBookSeries(formValues, history);
    };

    const goBack = () => {
        history.goBack();
    };

    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: goBack
    };

    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle title="New Books Series"/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark"> {getFormattedMessage('books-series.input.new-btn.label')}</h5>
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
    )
};

CreateBookSeries.propTypes = {
    history: PropTypes.object,
    books: PropTypes.array,
    addBookSeries: PropTypes.func,
    fetchBooks: PropTypes.func,
};

export default connect(null, { addBookSeries })(CreateBookSeries);
