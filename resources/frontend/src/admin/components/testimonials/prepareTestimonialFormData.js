export default (formValues) => {
    const formData = new FormData();
    const { name, occupation, description, file, file_name } = formValues;
    formData.append('name', name);
    formData.append('occupation', occupation ? occupation : '');
    formData.append('description', description ? description : '');
    if (file) {
        formData.append('image', file, file.name);
    }
    if (!file_name && !file) {
        formData.append('remove_image', '1');
    }
    return formData;
}
