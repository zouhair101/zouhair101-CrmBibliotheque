import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Users.scss';
import {publicImagePathURL} from '../../../appConstant';
import {Routes} from "../../../constants";
import ModalAction from '../../../shared/action-buttons/ModalAction';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {getCurrentUser} from "../../shared/sharedMethod";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {getAvatarName} from "../../../shared/sharedMethod";
import {addToast} from '../../../store/action/toastAction';
import {icon} from "../../../constants";

const UserTable = (props) => {
    const { users, onClickModal, setActiveInactive, history, isLoading, totalRecord, onChangeData, user } = props;
    const columns = [
        {
            name: getFormattedMessage('profile.title'),
            selector: 'image',
            width: '90px',
            cell: row => {
                const imageUrl = row.image_path ? row.image_path : null;
                if (imageUrl)
                    return <img src={imageUrl ? imageUrl : null} className="user-table-row__profile-img"
                                alt={imageUrl}/>;
                return <div className="user__avatar">
                    <span>{getAvatarName(row.first_name + ' ' + row.last_name)}</span>
                </div>;
            }
        },
        {
            name: getFormattedMessage('react-data-table.name.column'),
            selector: 'first_name',
            sortable: true,
            cell: row => <span>{row.first_name + ' ' + row.last_name}</span>
        },
        {
            name: getFormattedMessage('profile.input.email.label'),
            selector: 'email',
            sortable: true,
        },
        {
            name: getFormattedMessage('profile.input.phone.label'),
            selector: 'phone',
            cell: row => {
                return <span>{ row.phone ? row.phone : 'N/A' }</span>
            },
            sortable: true,
        },
        {
            name: getFormattedMessage('users.select.role.label'),
            selector: 'role_name',
            sortable: true,
            cell: row => {
                if (row.roles) {
                    row.role_name = row.roles[0].display_name;
                }
                return <span>{row.role_name}</span>
            },
        },
        {
            name: getFormattedMessage('react-data-table.status.column'),
            selector: 'status',
            width: '90px',
            center: true,
            cell: (row) =>
                getCurrentUser().id !== row.id ?
                    <div className="user-form__switch">
                        <Field name="is_active" checked={row.is_active} component={ToggleSwitch}
                               onChange={() => onChecked(row)}/>
                    </div> : null
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true,
            width: '150px',
            cell: row => <ModalAction onOpenModal={onClickModal} isHideDetailIcon={false}
                                      goToDetailScreen={goToUserDetail} item={row} isHideDeleteIcon={user.id === row.id}/>
        }];

    const onChecked = (user) => {
        setActiveInactive(user.id, user.is_active);
    };

    const goToUserDetail = (userId) => {
        history.push(`${Routes.USERS + userId}/details`);
    };

    return (
        <ReactDataTable items={users} columns={columns} emptyStateMessageId="users.empty-state.title"
                        emptyNotFoundStateMessageId="users.not-found.empty-state.title"
                        loading={isLoading} totalRows={totalRecord} onChange={onChangeData} icon={(icon.USERS)}/>
    );
};

UserTable.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object,
    users: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    onChangeData: PropTypes.func,
    onClickModal: PropTypes.func,
    setActiveInactive: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        user: state.profile
    }
};

const userForm = reduxForm({ form: 'userForm' })(UserTable);
export default connect(mapStateToProps, { addToast })(userForm);
