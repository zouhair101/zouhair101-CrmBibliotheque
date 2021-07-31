import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RoleForm from './RoleForm';
import Modal from '../../../shared/components/Modal';
import {editRole} from '../../store/actions/roleAction';
import {fetchPermissions} from '../../store/actions/permissionAction';

const EditRole = (props) => {
    const { role, permissions, fetchPermissions, editRole, toggleModal } = props;

    useEffect(() => {
        fetchPermissions();
    }, []);

    const onSaveRole = (formValues) => {
        const copyFormValues = _.clone(formValues);
        copyFormValues.permissions = copyFormValues.permissionArray;
        delete copyFormValues.permissionArray;
        editRole(role.id, copyFormValues);
    };
    const prepareFormOption = {
        onSaveRole,
        onCancel: toggleModal,
        permissionsArray: permissions,
        initialValues: {
            name: role.name,
            display_name: role.display_name,
            description: role.description
        }
    };

    if (permissions.length === 0) {
        return null;
    }

    return <Modal {...props} content={<RoleForm {...prepareFormOption}/>}/>
};

EditRole.propTypes = {
    role:PropTypes.object,
    permissions:PropTypes.array,
    editRole: PropTypes.func,
    fetchPermissions: PropTypes.func,
    toggleModal: PropTypes.func,
};

const preparePermissions = (permissions, selectedPermission) => {
    let permissionArray = [];
    permissions.forEach(permission => {
        const perm = selectedPermission.find(perm => perm.id === permission.id);
        let selected = false;
        if (perm) {
            selected = true;
        }
        permissionArray.push({ id: permission.id, name: permission.display_name, selected, isChecked: selected })
    });
    return permissionArray;
};
const mapStateToProps = (state, ownProps) => {
    const { permissions } = state;
    return {
        permissions: preparePermissions(permissions, ownProps.role.permissions)
    }
};
export default connect(mapStateToProps, { editRole, fetchPermissions })(EditRole);
