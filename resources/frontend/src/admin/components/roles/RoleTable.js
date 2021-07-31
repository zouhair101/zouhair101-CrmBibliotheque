import React from 'react';
import {Table} from 'reactstrap';
import PropTypes from 'prop-types';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const RoleTable = (props) => {
    const { roles, onClickModal, sortAction, sortObject } = props;
    const headers = [{ id: 'display_name', name: getFormattedMessage('roles.input.display-name.label') },
        { id: 'name', name: getFormattedMessage('react-data-table.name.column') }
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers };

    return (
        <div className="overflow-auto">
            <Table hover bordered striped responsive size="md">
                <thead>
                    <TableHeader{...headerProps}/>
                </thead>
                <tbody>
                {roles.map((role) =>
                    (
                        <tr key={role.id.toString()}>
                            <td>{role.display_name}</td>
                            <td>{role.name}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onClickModal} item={role}/>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        </div>
    );
};

RoleTable.propTypes = {
    sortObject: PropTypes.object,
    roles: PropTypes.array,
    sortAction: PropTypes.func,
    onClickModal: PropTypes.func,
};

export default RoleTable;
