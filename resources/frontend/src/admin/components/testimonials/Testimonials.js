import React from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Testimonials.scss';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {fetchTestimonials} from '../../store/actions/testimonialAction';
import TestimonialModal from "./TestimonialModal";
import TestimonialTable from "./TestimonialTable";

const Testimonials = (props) => {
    const { testimonials, fetchTestimonials, toggleModal, history, isLoading, totalRecord } = props;
    const [isCreate, isEdit, isDelete, testimonial, onOpenModal] = openModal();
    const cardModalProps = { testimonial, isCreate, isEdit, isDelete, toggleModal };

    const onChangeData = (filter) => {
        fetchTestimonials(filter, true);
    };

    const onClickModal = (isEdit, testimonial = null, isDelete = false) => {
        onOpenModal(isEdit, testimonial, isDelete);
        toggleModal();
    };

    const cardBodyProps = {
        testimonials,
        onClickModal,
        history,
        isLoading,
        totalRecord,
        onChangeData
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title="Testimonials"/>
                <ProgressBar/>
                <h5 className="page-heading">{getFormattedMessage('testimonials.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('testimonials.modal.add.title')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <TestimonialTable {...cardBodyProps}/>
                            <TestimonialModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Testimonials.propTypes = {
    history: PropTypes.object,
    testimonials: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchTestimonials: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { testimonials, isLoading, totalRecord } = state;
    return { testimonials, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchTestimonials, toggleModal })(Testimonials);
