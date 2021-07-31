import React from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import TagModal from './TagModal';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchTags} from '../../store/actions/tagAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {icon} from "../../../constants";

const Tags = (props) => {
    const { tags, toggleModal, fetchTags, totalRecord, isLoading } = props;
    const [isCreate, isEdit, isDelete, tag, onOpenModal] = openModal();
    const cardModalProps = { tag, isCreate, isEdit, isDelete, toggleModal };

    const onChange = (filter) => {
        fetchTags(filter, true);
    };

    const onClickModal = (isEdit, tag = null, isDelete = false) => {
        onOpenModal(isEdit, tag, isDelete);
        toggleModal();
    };

    const columns = [
        {
            name: getFormattedMessage('react-data-table.name.column'),
            selector: 'name',
            sortable: true,
            minWidth: '400px'
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            right: true,
            cell: row => <ModalAction onOpenModal={onClickModal} item={row}/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Tags"/>
                <h5 className="page-heading">{getFormattedMessage('tags.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('tags.input.new-btn.label')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={tags} columns={columns} emptyStateMessageId="tags.empty-state.title"
                                            emptyNotFoundStateMessageId="tags.not-found.empty-state.title"
                                            loading={isLoading} totalRows={totalRecord} onChange={onChange} icon={(icon.TAG)}/>
                            <TagModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Tags.propTypes = {
    tags: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchTags: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { tags, isLoading, totalRecord } = state;
    return { tags, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchTags, toggleModal })(Tags);
