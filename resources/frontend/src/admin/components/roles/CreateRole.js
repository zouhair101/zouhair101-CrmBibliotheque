import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RoleForm from './RoleForm';
import Modal from '../../../shared/components/Modal';
import {preparePermissions} from "../../shared/prepareArray";
import {addRole} from '../../store/actions/roleAction';
import {fetchPermissions} from '../../store/actions/permissionAction';

const CreateRole = (props) => {
    const { addRole, permissions, toggleModal, fetchPermissions } = props;

    useEffect(() => {
        fetchPermissions();
    }, []);

    const onSaveRole = (formValues) => {
        const copyFormValues = _.clone(formValues);
        copyFormValues.permissions = copyFormValues.permissionArray;
        delete copyFormValues.permissionArray;
        addRole(copyFormValues);
    };

    const prepareFormOption = {
        onSaveRole,
        onCancel: toggleModal,
        permissionsArray: permissions
    };

    if (permissions.length === 0) {
        return null;
    }

    return <Modal {...props} content={<RoleForm{...prepareFormOption}/>}/>
};

CreateRole.propTypes = {
    permissions: PropTypes.array,
    addRole: PropTypes.func,
    fetchPermissions: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { permissions } = state;
    return { permissions: preparePermissions(permissions) }
};

export default connect(mapStateToProps, { addRole, fetchPermissions })(CreateRole);
