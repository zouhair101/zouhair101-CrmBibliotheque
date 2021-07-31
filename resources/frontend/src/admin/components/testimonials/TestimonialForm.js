import React, {useEffect, createRef} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './Testimonials.scss';
import {publicImagePath} from '../../../appConstant';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {imagePicker} from "../../../shared/custom-hooks";
import testimonialValidate from "./testimonialValidate";
import TextArea from "../../../shared/components/TextArea";

const TestimonialForm = (props) => {
    const { initialValues, change, onSaveTestimonial, handleSubmit } = props;
    const inputRef = createRef();
    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] = imagePicker(change,
        !!initialValues.image_path ? initialValues.image_path :
            !!initialValues.isCreate ? publicImagePath.USER_AVATAR : null,
        !!initialValues.isCreate ? publicImagePath.USER_AVATAR : null,
        !(!!initialValues.image_path),
    );

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = (formValues) => {
        formValues.file = file;
        onSaveTestimonial(formValues);
    };

    const imagePickerOptions = {
        testimonial: { name: initialValues ? initialValues.name : null },
        image,
        isDefaultImage,
        onRemovePhoto,
        onFileChange
    };

    return (
        <Row className="animated fadeIn testimonial-form m-3">
            <Col xs={8} className="primary-detail">
                <Row>
                    <Col xs={12} sm={6}>
                        <Field name="name" label="testimonials.input.name.label" required inputRef={inputRef}
                               groupText="user-circle-o" component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="occupation" label="testimonials.input.occupation.label" required
                               groupText="user-circle-o" component={InputGroup}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="description" required cols={90} rows={7}
                               label="testimonials.input.description.label" component={TextArea}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="testimonial-profile">
                <h5 className="testimonial-profile__title">{getFormattedMessage('testimonials.profile')}</h5>
                <hr/>
                <div className="mt-5">
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImagePicker {...imagePickerOptions}/>
                </div>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

TestimonialForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveTestimonial: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

export default reduxForm({ form: 'testimonialForm', validate: testimonialValidate })(TestimonialForm);
