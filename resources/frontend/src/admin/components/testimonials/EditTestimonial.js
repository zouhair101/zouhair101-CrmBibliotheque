import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TestimonialForm from './TestimonialForm';
import Modal from '../../../shared/components/Modal';
import prepareTestimonialFormData from "./prepareTestimonialFormData";
import {editTestimonial} from "../../store/actions/testimonialAction";

const prepareInitialValue = (testimonial) => {
    const { id, name, occupation, description, image, image_path } = testimonial;
    return {
        id,
        name,
        occupation,
        description,
        image,
        image_path,
        file_name: !!image
    };
};

const EditTestimonial = (props) => {
    const { testimonial, editTestimonial, toggleModal } = props;

    const onSaveTestimonial = (formValues) => {
        editTestimonial(testimonial.id, prepareTestimonialFormData(formValues));
    };

    const prepareFormOption = {
        onSaveTestimonial,
        onCancel: toggleModal,
        initialValues: prepareInitialValue(testimonial),
    };

    return <Modal {...props} content={<TestimonialForm {...prepareFormOption}/>}/>
};

EditTestimonial.propTypes = {
    testimonial: PropTypes.object,
    editTestimonial: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editTestimonial })(EditTestimonial);
