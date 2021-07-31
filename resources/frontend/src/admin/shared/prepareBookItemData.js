export default (formValues) => {
    const { book_code, edition, file, format, language_id, location, price, publisher_id, status, items, id } = formValues;
    const formData = new FormData();
    formData.append('id', id ? id : '');
    formData.append('book_code', book_code);
    formData.append('edition', edition);
    formData.append('file', file ? file[0] : '');
    formData.append('format', format);
    formData.append('language_id', language_id);
    formData.append('location', location);
    formData.append('price', price ? price : '');
    formData.append('status', status);
    formData.append('items', items ? items : '');
    formData.append('publisher_id', publisher_id);

    return formData;
}
