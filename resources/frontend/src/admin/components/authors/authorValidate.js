import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = getFormattedMessage('profile.input.first-name.validate.label');
    }
    return errors;
};
