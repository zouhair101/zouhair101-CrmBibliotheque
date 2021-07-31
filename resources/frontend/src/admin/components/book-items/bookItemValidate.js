import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    const bookCodeExpression = /^\d{8}$/;
    if (!formValues.book_code) {
        errors.book_code = getFormattedMessage('books.items.input.book-code.required.validate.label');
    }
    if (formValues.book_code && !bookCodeExpression.test(formValues.book_code)) {
        errors.book_code = getFormattedMessage('books.items.input.book-code.validate.label');
    }
    if (!formValues.edition) {
        errors.edition = getFormattedMessage('books.items.input.edition.validate.label');
    }
    if (!formValues.format) {
        errors.format = getFormattedMessage('books.items.select.format.validate.label');
    }
    if (formValues.format && formValues.format.name === 'E-Book' && !formValues.hasOwnProperty('file')) {
        errors.format = getFormattedMessage('books.items.select.format-file.validate.label');
    }
    if (!formValues.language) {
        errors.language = getFormattedMessage('books.items.select.language.validate.label');
    }
    // if (!formValues.price) { Remove comment for make price required
    //     errors.price = getFormattedMessage('books.items.input.price.validate.label');
    // }
    return errors;
};
