import {getFormattedMessage} from "../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = getFormattedMessage('profile.input.first-name.validate.label');
    }
    if (!formValues.last_name) {
        errors.last_name = getFormattedMessage('profile.input.last-name.validate.label');
    }
    if (!formValues.email) {
        errors.email = getFormattedMessage('profile.input.email-required.validate.label');
    }
    const emailExpression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/;
    if (formValues.email && !emailExpression.test(formValues.email)) {
        errors.email = getFormattedMessage('profile.input.email-invalid.validate.label');
    }
    if (!formValues.password) {
        errors.password = getFormattedMessage('change-password.password.input.validate.msg');
    }
    if(!formValues.confirm_password) {
        errors.confirm_password = getFormattedMessage('change-password.confirm_password.input.validate.msg');
    }
    if (formValues.confirm_password && formValues.password !== formValues.confirm_password) {
        errors.confirm_password = getFormattedMessage('change-password.match_password.input.validate.msg');
    }
    const phoneExpression = /^\d{10}$/;
    if (formValues.phone && !phoneExpression.test(formValues.phone)) {
        errors.phone = getFormattedMessage('profile.input.phone.validate.label');
    }
    if (!formValues.membership_plan) {
        errors.membership_plan = getFormattedMessage('members.select.plan.validate.label');
    }
    if (!formValues.role) {
        errors.role = getFormattedMessage('users.select.role.validate.label');
    }
    return errors;
};
