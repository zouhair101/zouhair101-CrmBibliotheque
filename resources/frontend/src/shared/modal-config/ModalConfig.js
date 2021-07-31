import React from 'react';
import PropTypes from 'prop-types';
import './ModalConfig.scss';
import {getFormattedMessage, getFormattedMessageWithIntl} from "../sharedMethod";

const ModalConfig = (props) => {
    const {
        modalTitle, NewComponent, EditComponent, isWide,
        DeleteComponent, addConfig = {}, editConfig, delConfig, deleteKey,
        props: { isCreate, isEdit, isDelete, toggleModal }
    } = props;

    if (!isDelete) {
        const prepareModalOption = {
            className: isWide ? 'modal-config--wide' : 'modal-config--medium',
            title: getFormattedMessage(modalTitle),
            toggleModal,
        };
        if (isEdit) {
            return <EditComponent {...prepareModalOption} {...editConfig}/>
        }
        if (isCreate) {
            return <NewComponent {...prepareModalOption} {...addConfig}/>
        }
        return null;
    }
    if (isDelete) {
        const prepareModalOption = {
            ...delConfig,
            title: getFormattedMessage(modalTitle),
            toggleModal,
            content: `${getFormattedMessageWithIntl('modal.delete.message')} "${deleteKey}" ?`,
        };
        return <DeleteComponent {...prepareModalOption}/>
    }
};

ModalConfig.propTypes = {
    NewComponent: PropTypes.object,
    EditComponent: PropTypes.object,
    DeleteComponent: PropTypes.object,
    addConfig: PropTypes.object,
    editConfig: PropTypes.object,
    delConfig: PropTypes.object,
    modalTitle: PropTypes.string,
    deleteKey: PropTypes.string,
    isWide: PropTypes.bool,
};

export default ModalConfig;
