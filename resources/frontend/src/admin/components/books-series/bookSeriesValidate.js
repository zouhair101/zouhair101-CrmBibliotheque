import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = getFormattedMessage('books-series.input.title.validate.label');
    }
    if (!formValues.series_items || !formValues.series_items.length) {
        errors.series_items = { _error: 'At least one item must be required.' }
    }
    const booksArrayErrors = [];
    if (formValues.series_items && formValues.series_items.length) {
        formValues.series_items.forEach((item, index) => {
            const bookErrors = {};
            if (!item || !item.book) {
                bookErrors.book = getFormattedMessage('books-series.items.select.book-name.validate.label');
                booksArrayErrors[index] = bookErrors
            }
        });
        if (booksArrayErrors.length) {
            errors.series_items = booksArrayErrors
        }
    }
    return errors;
};
