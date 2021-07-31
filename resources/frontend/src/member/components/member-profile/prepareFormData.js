export default (formValues) => {
    const formData = new FormData();
    const { is_active, first_name, last_name, email, password, phone, address_1, address_2, country, city, state, zip, file, file_name } = formValues;
    formData.append('is_active', is_active ? '1' : '0');
    formData.append('first_name', first_name);
    formData.append('last_name', last_name ? last_name : '');
    formData.append('email', email);
    if (password) {
        formData.append('password', password);
    }
    formData.append('phone', phone ? phone : '');
    formData.append('address_1', address_1 ? address_1 : '');
    formData.append('address_2', address_2 ? address_2 : '');
    formData.append('country_id', country ? country.id.toString() : '');
    formData.append('city', city ? city : '');
    formData.append('state', state ? state : '');
    formData.append('zip', zip ? zip.toString() : '');
    if (file) {
        formData.append('image', file, file.name);
    }
    if (!file_name && !file) {
        formData.append('remove_image', '1');
    }
    return formData;
}
