export const prepareRoles = (roles) => {
    let rolesArray = [];
    roles.forEach(role => rolesArray.push({ id: role.id, name: role.display_name }));
    return rolesArray;
};

export const prepareBookLanguage = (bookLanguages) => {
    let bookLanguageArray = [];
    bookLanguages.forEach(author => bookLanguageArray.push({
        id: author.id,
        name: author.language_name
    }));
    return bookLanguageArray;
};

export const prepareCreatableObject = (objectArray, labelKey = 'name') => {
    let newObjectArray = [];
    objectArray.forEach(item => newObjectArray.push({ value: item.id, label: item[labelKey] }));
    return newObjectArray;
};

export const prepareImportedBookObject = (objectArray) => {
    let newObjectArray = [];
    objectArray.forEach(item => newObjectArray.push({ value: item, label: item }));
    return newObjectArray;
};

export const preparePermissions = permissions => {
    let permissionArray = [];
    permissions.forEach(permission => {
        permissionArray.push({ id: permission.id, name: permission.display_name })
    });
    return permissionArray;
};
