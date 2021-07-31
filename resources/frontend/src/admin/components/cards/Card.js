import React from 'react';
import PropTypes from 'prop-types';
import CardModal from './CardModal';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import ReactDataTable from '../../../shared/table/ReactDataTable';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getFormattedMessage } from '../../../shared/sharedMethod';
import { openModal } from '../../../shared/custom-hooks';
import { fetchCards } from '../../store/actions/cardActions';
import { toggleModal } from '../../../store/action/modalAction';
import { icon } from '../../../constants';

const Cards = (props) => {
    const { cards, fetchCards, toggleModal, isLoading, totalRecord } = props;
    const [isCreate, isEdit, isDelete, card, onOpenModal] = openModal();
    const cardModalProps = { card, isCreate, isEdit, isDelete, toggleModal };

    const onChange = (filter) => {
        fetchCards(filter, true);
    };

    const onClickModal = (isEdit, card = null, isDelete = false) => {
        onOpenModal(isEdit, card, isDelete);
        toggleModal();
    };

    const columns = [
        {
            name: getFormattedMessage("about-us-card.input.title.label"),
            selector: 'title',
            sortable: true,
            minWidth: '400px'
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            right: true,
            cell: row => <ModalAction onOpenModal={ onClickModal } item={ row }/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        },
    ];

    return (
        <Row className='animated fadeIn'>
            <Col sm={ 12 } className='mb-2'>
                <div className='d-flex justify-content-end px-2 py-0'>
                    <Button onClick={ () => onClickModal(false) } size='md' color='primary ml-2'>
                        { getFormattedMessage('about-us-card.input.new-btn.label') }
                    </Button>
                </div>
            </Col>
            <Col sm={ 12 }>
                <ReactDataTable items={ cards }
                                columns={ columns }
                                loading={ isLoading }
                                emptyStateMessageId='about-us-card.empty-state.title'
                                emptyNotFoundStateMessageId='about-us-card.not-found.empty-state.title'
                                totalRows={ totalRecord }
                                onOpenModal={ onOpenModal }
                                onChange={ onChange }
                                icon={ (icon.GENRES) }/>
                <CardModal { ...cardModalProps }/>
            </Col>
        </Row>
    );
};

Cards.propTypes = {
    cards: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchCards: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { cards, isLoading, totalRecord } = state;
    return { cards, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchCards, toggleModal })(Cards);
