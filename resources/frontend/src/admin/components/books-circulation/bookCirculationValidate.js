import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.book) {
        errors.book = getFormattedMessage('books-circulation.select.book.validate.label');
    }
    if (!formValues.book_item) {
        errors.book_item = getFormattedMessage('books-circulation.select.book-item.validate.label');
    }
    if (!formValues.member) {
        errors.member = getFormattedMessage('books-circulation.select.member.validate.label');
    }
    if (!formValues.status) {
        errors.status = getFormattedMessage('books-circulation.select.status.validate.label');
    }
    return errors;
};
