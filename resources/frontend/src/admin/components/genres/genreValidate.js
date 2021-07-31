import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = getFormattedMessage('genres.input.name.validate.label');
    }

    return errors;
};
