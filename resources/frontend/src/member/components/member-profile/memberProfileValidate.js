import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = getFormattedMessage('profile.input.first-name.validate.label');
    }
    if (!formValues.last_name) {
        errors.last_name = getFormattedMessage('profile.input.last-name.validate.label');
    }
    if (formValues.password && formValues.password.length < 6) {
        errors.password = getFormattedMessage('profile.input.password-invalid.validate.label');
    }
    if (formValues.confirm_password !== formValues.password) {
        errors.confirm_password = getFormattedMessage('profile.input.confirm-password.validate.label');
    }
    const phoneExpression = /^\d{10}$/;
    if (formValues.phone && !phoneExpression.test(formValues.phone)) {
        errors.phone = getFormattedMessage('profile.input.phone.validate.label');
    }
    return errors;
};
