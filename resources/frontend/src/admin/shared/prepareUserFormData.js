export default (formValues) => {
    const formData = new FormData();
    const {
        is_active, first_name, last_name, email, password, confirm_password, phone, address_1, address_2,
        country, city, state, zip, membership_plan, role, file, file_name
    } = formValues;
    formData.append('is_active', is_active ? '1' : '0');
    formData.append('first_name', first_name);
    formData.append('last_name', last_name ? last_name : '');
    formData.append('email', email);
    if (password) {
        formData.append('password', password);
    }
    if (confirm_password) {
        formData.append('confirm_password', confirm_password);
    }
    formData.append('phone', phone ? phone : '');
    formData.append('address_1', address_1 ? address_1 : '');
    formData.append('address_2', address_2 ? address_2 : '');
    formData.append('country_id', country ? country.id.toString() : '');
    formData.append('city', city ? city : '');
    formData.append('state', state ? state : '');
    formData.append('zip', zip ? zip.toString() : '');
    if (role) {
        formData.append('role_id', role.id.toString());
    }
    if (membership_plan) {
        formData.append('membership_plan_id', membership_plan.id.toString());
    }
    if (file) {
        formData.append('image', file, file.name);
    }
    if (!file_name && !file) {
        formData.append('remove_image', '1');
    }
    return formData;
}
