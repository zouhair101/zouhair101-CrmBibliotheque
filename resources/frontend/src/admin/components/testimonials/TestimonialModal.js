import React from 'react';
import PropTypes from 'prop-types';
import CreateTestimonial from './CreateTestimonial';
import EditTestimonial from './EditTestimonial';
import DeleteTestimonial from './DeleteTestimonial';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const TestimonialModal = (props) => {
    const { testimonial, isCreate, isEdit, isDelete } = props;
    const editConfig = { testimonial };
    const delConfig = { testimonialId: testimonial ? testimonial.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'testimonials.modal.add.title',
            'testimonials.modal.edit.title', 'testimonials.modal.delete.title'),
        NewComponent: CreateTestimonial,
        EditComponent: EditTestimonial,
        DeleteComponent: DeleteTestimonial,
        deleteKey: testimonial ? testimonial.name : null,
        editConfig,
        delConfig,
        isWide: true,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

TestimonialModal.propTypes = {
    testimonial: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default TestimonialModal;
