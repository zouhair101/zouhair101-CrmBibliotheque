import {getFormattedMessage} from "../../../shared/sharedMethod";

export default (formValues) => {
    const errors = {};
    if (!formValues.email) {
        errors.email = getFormattedMessage('profile.input.email-required.validate.label');
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(formValues.email)) {
        // errors.email = 'Invalid email address !'
    }
    if (!formValues.password) {
        errors.password = getFormattedMessage('profile.input.password-required.validate.label');
    }
    if (formValues.password && formValues.password.length < 6) {
        errors.password = getFormattedMessage('profile.input.password-invalid.validate.label');
    }
    if (formValues.confirm_password !== formValues.password) {
        errors.confirm_password = getFormattedMessage('profile.input.confirm-password.validate.label');
    }
    return errors;
};
