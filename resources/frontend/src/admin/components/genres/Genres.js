import React from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import GenreModal from "./GenerModal";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {fetchGenres} from '../../store/actions/genreAction';
import {toggleModal} from '../../../store/action/modalAction';
import {icon} from "../../../constants";

const Genres = (props) => {
    const { genres, fetchGenres, toggleModal, isLoading, totalRecord } = props;
    const [isCreate, isEdit, isDelete, genre, onOpenModal] = openModal();
    const cardModalProps = { genre, isCreate,isEdit, isDelete, toggleModal };

    const onChange = (filter) => {
        fetchGenres(filter, true);
    };

    const onClickModal = (isEdit, genre = null, isDelete = false) => {
        onOpenModal(isEdit, genre, isDelete);
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
                <HeaderTitle title="Genres"/>
                <h5 className="page-heading">{getFormattedMessage('genres.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('genres.input.new-btn.label')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={genres} columns={columns} loading={isLoading}
                                            emptyStateMessageId="genres.empty-state.title"
                                            emptyNotFoundStateMessageId="genres.not-found.empty-state.title"
                                            totalRows={totalRecord}
                                            onOpenModal={onOpenModal} onChange={onChange} icon={(icon.GENRES)}/>
                            <GenreModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Genres.propTypes = {
    genres: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchGenres: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { genres, isLoading, totalRecord } = state;
    return { genres, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchGenres, toggleModal })(Genres);
