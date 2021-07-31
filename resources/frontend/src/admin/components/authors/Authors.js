import React from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AuthorModal from './AuthorModal';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import {icon} from "../../../constants";

const Authors = (props) => {
    const { authors, toggleModal, totalRecord, isLoading, fetchAuthors } = props;
    const [isCreate, isEdit, isDelete, author, onOpenModal] = openModal();
    const cardModalProps = { author, isCreate, isEdit, isDelete, toggleModal };

    const onChange = (filter) => {
        fetchAuthors(filter, true);
    };

    const onClickModal = (isEdit, author = null, isDelete = false) => {
        onOpenModal(isEdit, author, isDelete);
        toggleModal();
    };

    const columns = [
        {
            name: getFormattedMessage('react-data-table.name.column'),
            selector: 'first_name',
            sortable: true,
            cell: row => <span>{row.first_name} {row.last_name}</span>,
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
                <HeaderTitle title="Authors"/>
                <h5 className="page-heading">{getFormattedMessage('authors.title')}</h5>
                <ProgressBar/>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('authors.input.new-btn.label')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={authors} columns={columns} loading={isLoading}
                                            emptyStateMessageId="authors.empty-state.title"
                                            emptyNotFoundStateMessageId="authors.not-found.empty-state.title" totalRows={totalRecord}
                                            onChange={onChange} icon={(icon.AUTHORS)}/>
                            <AuthorModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Authors.propTypes = {
    authors: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchAuthors: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { authors, isLoading, totalRecord } = state;
    return { authors, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchAuthors, toggleModal })(Authors);
