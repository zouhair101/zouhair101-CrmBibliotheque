import React from 'react';
import {FormattedMessage, useIntl} from "react-intl";
import moment from 'moment';
import _ from 'lodash';
import {countryCode} from '../constants';
import {settingsKey} from "../appConstant";

export const priceFormatter = (price, format) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: format
    }).format(price);
};

export const dateFormatter = (date) => {
    if (!date) {
        return '';
    }
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, YYYY');
};

export const timeFormatter = (date) => {
    if (!date) {
        return '';
    }
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('hh:mma');
};

export const dateTimeFormatter = (date) => {
    if (!date) {
        return '';
    }
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mma');
};


export const prepareFullNames = (members) => {
    let memberArray = [];
    members.forEach(member => {
        memberArray.push({ id: member.id, name: member.first_name + ' ' + member.last_name });
    });
    return memberArray;
};

export const enableDisableUserInput = (event, digit) => {
    if (event.target.value.length > digit) {
        event.preventDefault();
    }
};

export const checkExistingRoute = (lastLocation, history) => {
    history.listen(location => {
        lastLocation = location;
    });
    const prevHistoryPush = history.push;
    history.push = (path) => {
        if (!lastLocation || path && path.pathname !== lastLocation.pathname + lastLocation.search + lastLocation.hash
        ) {
            prevHistoryPush(path)
        }
    };
};

export const prepareFullAddress = (address) => {
    let fullAddress = '';
    if (address) {
        if (address.address_1) {
            fullAddress += address.address_1;
        }
        if (address.address_2) {
            fullAddress += ',  ' + address.address_2;
        }
        if (address.city) {
            fullAddress += ',  ' + address.city;
        }
        if (address.state) {
            fullAddress += ',  ' + address.state;
        }
        if (address.country) {
            fullAddress += ',  ' + address.country.name;
        }
        if (address.zip) {
            fullAddress += '-' + address.zip;
        }
    }
    return fullAddress;
};

export const prepareProfileData = (userProfile) => {
    const { id, is_active, first_name, last_name, email, password, phone, address, image, image_path, roles, membership_plan } = userProfile;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        password,
        image,
        image_path,
        phone,
        file_name: !!image
    };
    if (roles) {
        changeAbleFields.role = { id: roles[0].id, name: roles[0].display_name };
    }
    if (membership_plan) {
        changeAbleFields.membership_plan = membership_plan;
    }
    if (address) {
        const { address_1, address_2, country, city, state, zip } = address;
        changeAbleFields.address_1 = address_1 ? address_1 : '';
        changeAbleFields.address_2 = address_2 ? address_2 : '';
        changeAbleFields.country = country ? country : null;
        changeAbleFields.city = city ? city : '';
        changeAbleFields.state = state ? state : '';
        changeAbleFields.zip = zip ? zip : '';
    }
    return changeAbleFields;
};

export const getAvatarName = (name) => {
    if (name) {
        return name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase())
            .join('');
    }
};

export const getFormattedMessage = (id) => {
    return <FormattedMessage id={id} defaultMessgae={id}/>
};

export const getDynamicFormattedMessage = (id, values) => {
    return <FormattedMessage id={id} defaultMessgae={id} values={values}/>
};

export const addRTLSupport = (rtlLang) => {
    const html = document.getElementsByTagName("html")[0];
    const att = document.createAttribute("dir");
    att.value = "rtl";
    if (rtlLang === settingsKey.LOCALE_ARABIC || rtlLang === settingsKey.LOCALE_PERSIAN) {
        html.setAttributeNode(att);
    } else {
        html.removeAttribute("dir");
    }
};
export const getModalTitle = (isCreate, isEdit, isDelete, createTitle, editTitle, deleteTitle) => {
    if (!isDelete) {
        return isCreate ? createTitle : editTitle;
    }
    return deleteTitle;
};

export const getFormattedMessageWithIntl = (id) => {
    const intl = useIntl();
    return intl.formatMessage({ id, defaultMessage: id });
};

export const getConcatedFormattedMessage = (msgId1, msgId2) => {
    return <><FormattedMessage id={msgId1}/>&nbsp;<FormattedMessage id={msgId2}/></>
};

export const getFormattedOptions = (options) => {
    const intl = useIntl();
    const copyOptions = _.cloneDeep(options);
    copyOptions.map(option => option.name = intl.formatMessage({
        id: option.name,
        defaultMessage: option.name
    }));
    return copyOptions;
};

export const getLocalStorageDataByEncryptKey = (keyName) => {
    return localStorage.getItem(keyName) ? JSON.parse(atob(localStorage.getItem(keyName))) : null;
};

export const getLocalStorageDataByKey = (keyName) => {
    return localStorage.getItem(keyName) ? localStorage.getItem(keyName) : null;
};
