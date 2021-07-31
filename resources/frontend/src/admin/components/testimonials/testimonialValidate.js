import {getFormattedMessage} from "../../../shared/sharedMethod";

/**
 *  Validation of testimonial
 * @param formValues
 */
export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = getFormattedMessage('testimonials.input.name.validate.label');
    }
    if (!formValues.occupation) {
        errors.occupation = getFormattedMessage('testimonials.input.occupation.validate.label');
    }
    if (!formValues.description) {
        errors.description = getFormattedMessage('testimonials.input.description.validate.label');
    }
    return errors;
};
