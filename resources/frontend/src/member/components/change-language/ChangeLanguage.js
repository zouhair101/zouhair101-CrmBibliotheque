import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {postSettings} from '../../store/actions/changeLanguageAction';
import ChangeLanguageForm from "./ChangeLanguageForm";
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {fetchSettings} from '../../store/actions/getLanguageAction';
import {languageOptions, settingsKey} from '../../constants';

const ChangeLanguage = (props) => {
    const { postSettings, toggleChangeLanguageModal, isChangeLanguageModelToggle, fetchSettings, settings, selectedLanguage } = props;
    const bookLanguagesOptions = getFormattedOptions(languageOptions);
    useEffect(() => {
        fetchSettings(true);
    }, []);

    const onSaveChangeLanguage = (language) => {
        postSettings(language);
    };

    const prepareFormOption = {
        onSaveChangeLanguage,
        initialValues: {
            language: bookLanguagesOptions.find(lang => lang.id === selectedLanguage.id),
        },
        onCancel: toggleChangeLanguageModal,
    };

    return (
        <Modal isOpen={isChangeLanguageModelToggle} toggle={toggleChangeLanguageModal}
                className={'modal-primary primary modal-config--small'}>
            <ModalHeader
                toggle={toggleChangeLanguageModal}>{getFormattedMessage('change-language.model.header-title')}</ModalHeader>
            <ModalBody>
                <ChangeLanguageForm{...prepareFormOption}/>
            </ModalBody>
        </Modal>
    );
};

ChangeLanguage.propTypes = {
    postSettings: PropTypes.func,
    toggleChangeLanguageModal: PropTypes.func,
    fetchSettings: PropTypes.func,
    settings: PropTypes.object,
    selectedLanguage: PropTypes.object,
};

const prepareSelectedSetting = (settings, filterKey) => {
    if (settings.length > 0) {
        return { id: settings[0].value, key: settings[0].key };
    }
};

const mapStateToProps = state => {
    const { settings } = state;
    const settingsArray = Object.values(settings);
    const settingsArr = _.mapKeys(settingsArray,'key');
    return {
        isChangeLanguageModelToggle: state.isChangeLanguageModelToggle,
        settings: settingsArr,
        selectedLanguage: prepareSelectedSetting(settingsArray, settingsKey.LANGUAGE),
    };
};

export default connect(mapStateToProps, { fetchSettings, postSettings })(ChangeLanguage);
