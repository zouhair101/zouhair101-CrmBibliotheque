import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.language_name) {
        errors.language_name = getFormattedMessage('book-languages.input.name.validate.label');
    }
    if (!formValues.language_code) {
        errors.language_code = getFormattedMessage('book-languages.input.code.validate.label');
    }
    return errors;
};
