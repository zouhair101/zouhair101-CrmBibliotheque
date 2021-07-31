import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import TestimonialForm from "./TestimonialForm";
import prepareTestimonialFormData from "./prepareTestimonialFormData";
import {addTestimonial} from "../../store/actions/testimonialAction";
import {Filters} from "../../../constants";

const CreateTestimonial = (props) => {
    const { addTestimonial, toggleModal } = props;

    const onSaveTestimonial = (formValues) => {
        addTestimonial(prepareTestimonialFormData(formValues), Filters.OBJ);
    };

    const prepareFormOption = {
        initialValues: { isCreate: true },
        onSaveTestimonial,
        onCancel: toggleModal,
    };

    return <Modal {...props} content={<TestimonialForm{...prepareFormOption}/>}/>
};

CreateTestimonial.propTypes = {
    addTestimonial: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addTestimonial })(CreateTestimonial);
