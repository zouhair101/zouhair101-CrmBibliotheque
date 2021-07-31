import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {useIntl} from 'react-intl';

export const openModal = () => {
    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [object, setObject] = useState(null);

    const onOpenModal = (isEd, obj = null, isDel = false) => {
        setIsCreate(!isEd);
        setIsEdit(isEd);
        setIsDelete(isDel);
        setObject(obj);
    };
    return [isCreate, isEdit, isDelete, object, onOpenModal];
};

export const imagePicker = (change, newImage, defImage = null, isDefImage = true, key = 'file_name') => {
    const [image, setImage] = useState(newImage);
    const [isDefaultImage, setIsDefaultImage] = useState(isDefImage);
    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        change(key, isDefImage);
        setFile(event.target.files[0]);
        setIsDefaultImage(false);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        }
    };
    const onRemovePhoto = () => {
        change(key, isDefImage);
        setFile(null);
        setImage(defImage);
        setIsDefaultImage(true);
    };
    return [image, isDefaultImage, file, onFileChange, onRemovePhoto];
};

export const bookCreationWarning = (change) => {
    const onChangeValue = (options, objArray, key) => {
        if (options && options.length > 0)
            change(key, _.differenceWith(options, objArray, _.isEqual));
    };
    return [onChangeValue];
};

export const bookITemCreationWarning = (change) => {
    const onChangeValue = (option, objArray, key, item) => {
        if (option) {
            change(`${item}.${key}`, _.differenceWith([option], objArray, _.isEqual));
        } else {
            change(`${item}.${key}`, []);
        }
    };
    return [onChangeValue];
};
