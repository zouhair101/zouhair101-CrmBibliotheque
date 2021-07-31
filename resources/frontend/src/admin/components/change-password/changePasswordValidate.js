import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.current_password) {
        errors.name = getFormattedMessage('change-password.old_password.input.validate.msg');
    }
    if (!formValues.password) {
        errors.password = getFormattedMessage('change-password.password.input.validate.msg');
    }
    if (formValues.password && formValues.password.length < 6) {
        errors.password = getFormattedMessage('change-password.input.password-length.validate.label');
    }
    if (!formValues.confirm_password) {
        errors.confirm_password = getFormattedMessage('change-password.confirm_password.input.validate.msg');
    }
    if (formValues.password !== formValues.confirm_password) {
        errors.confirm_password = getFormattedMessage('change-password.match_password.input.validate.msg');
    }

    return errors;
};
