import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.library_name) {
        errors.library_name = getFormattedMessage('settings.input.app-name.validate.label');
    }
    if (!formValues.currency) {
        errors.currency = getFormattedMessage('settings.select.currency.validate.label');
    }
    if (!formValues.issue_due_days) {
        errors.issue_due_days = getFormattedMessage('settings.input.issue-due-days.validate.label');
    }
    if (!formValues.return_due_days) {
        errors.return_due_days = getFormattedMessage('settings.input.return-due-days.validate.label');
    }
    if (!formValues.language) {
        errors.language = getFormattedMessage('settings.select.language.validate.label');
    }
    if (!formValues.reserve_books_limit) {
        errors.language = getFormattedMessage('settings.input.max-reserve-books-limit.validate.label');
    }
    if (!formValues.issue_books_limit) {
        errors.language = getFormattedMessage('settings.input.max-issue-books-limit.validate.label');
    }
    return errors;
};
