import { getFormattedMessage } from '../../../shared/sharedMethod';

export default formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = getFormattedMessage('about-us-card.input.title.validate.label');
    }

    return errors;
};
