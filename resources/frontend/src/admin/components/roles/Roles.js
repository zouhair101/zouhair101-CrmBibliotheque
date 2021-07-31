import React, {useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RoleModal from './RoleModal';
import Role from './RoleTable';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import CustomSearchField from '../../../shared/components/CustomSearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {sortAction} from '../../../store/action/sortAction';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchRoles} from '../../store/actions/roleAction';
import {icon} from "../../../constants";

const Roles = (props) => {
    const { roles, fetchRoles, sortAction, sortObject, toggleModal, searchText } = props;
    const [isCreate, isEdit, isDelete, role, onOpenModal] = openModal();
    const cardModalProps = { role, isCreate, isEdit, isDelete, toggleModal };

    useEffect(() => {
        fetchRoles(true);
    }, []);

    const onClickModal = (isEdit, role = null, isDelete = false) => {
        onOpenModal(isEdit, role, isDelete);
        toggleModal();
    };

    const cardBodyProps = { sortAction, sortObject, roles, onClickModal };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Roles"/>
                <h5 className="page-heading">{getFormattedMessage('roles.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('roles.input.new-btn.label')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-end mb-2">
                                {roles.length > 0 || searchText ? <CustomSearchField/> : null}
                            </div>
                            {roles.length > 0 ? <Role {...cardBodyProps}/> :
                                <EmptyComponent icon={(icon.ROLE)}
                                title={searchText ? getFormattedMessage('roles.not-found.empty-state.title') :
                                        getFormattedMessage('roles.empty-state.title')} />}
                            <RoleModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Roles.propTypes = {
    sortObject: PropTypes.object,
    roles: PropTypes.array,
    searchText: PropTypes.string,
    fetchRoles: PropTypes.func,
    sortAction: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { roles, searchText, sortObject } = state;
    let rolesArray = Object.values(roles);
    if (searchText) {
        const filterKeys = ['name', 'display_name'];
        rolesArray = searchFilter(rolesArray, searchText, filterKeys);
    }
    if (sortObject) {
        rolesArray = sortFilter(rolesArray, sortObject);
    }
    return { roles: rolesArray, sortObject, searchText };
};

export default connect(mapStateToProps, { fetchRoles, sortAction, toggleModal })(Roles);
