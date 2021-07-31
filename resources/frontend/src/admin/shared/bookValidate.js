import {getFormattedMessage} from "../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.isbn) {
        errors.isbn = getFormattedMessage('books.input.isbn.validate.label');
    }
    if (!formValues.authors || !formValues.authors.length) {
        errors.authors = getFormattedMessage('books.input.authors.validate.label');
    }
    if (!formValues.name) {
        errors.name = getFormattedMessage('books.input.name.validate.label');
    }
    if (!formValues.genres || !formValues.genres.length) {
        errors.genres = getFormattedMessage('books.input.genres.validate.label');
    }
    if (!formValues.items || !formValues.items.length) {
        errors.items = { _error: getFormattedMessage('redux-form.field-array.no-item.message.validate') }
    }
    const booksArrayErrors = [];
    if (formValues.items && formValues.items.length) {
        formValues.items.forEach((item, index) => {
            const bookErrors = {};
            if (!item || !item.edition) {
                bookErrors.edition = getFormattedMessage('books.items.input.edition.validate.label');
                booksArrayErrors[index] = bookErrors
            }
            if (!item || !item.format) {
                bookErrors.format = getFormattedMessage('books.items.select.format.validate.label');
                booksArrayErrors[index] = bookErrors
            }
            if (!item || !item.language) {
                bookErrors.language = getFormattedMessage('books.items.select.language.validate.label');
                booksArrayErrors[index] = bookErrors
            }
            // if (!item || !item.price) {
            //     bookErrors.price = getFormattedMessage('books.items.input.price.validate.label');
            //     booksArrayErrors[index] = bookErrors
            // }
        });
        if (booksArrayErrors.length) {
            errors.items = booksArrayErrors
        }
    }
    return errors;
};
