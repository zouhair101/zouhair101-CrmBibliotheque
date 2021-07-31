import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

const ModalAction = (props) => {
    const {
        onOpenModal, item, isEditMode = false, goToEditItem, goToDetailScreen = null,
        isHideDeleteIcon = false, isHideEditIcon = false, isHideDetailIcon = true
    } = props;

    return (
        isEditMode ?
            <>
                {!isHideEditIcon ?
                    <Button color="primary" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        goToEditItem(item.id)
                    }}>
                        <i className="cui-pencil icons font-md"/>
                    </Button> : null
                }
                {!isHideDetailIcon ?
                    <Button className="ml-2" color="success" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        goToDetailScreen(item.id)
                    }}>
                        <i className="fa fa-eye fa-sm text-white"/>
                    </Button> : null
                }
                <Button className="ml-2" color="danger" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(item)
                }}>
                    <i className="cui-trash icon font-md"/>
                </Button>
            </> :
            <>
                {!isHideEditIcon ?
                    <Button color="primary" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(true, item)
                    }}>
                        <i className="cui-pencil icons font-md"/>
                    </Button> : null
                }
                {!isHideDetailIcon ?
                    <Button className="ml-2" color="success" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        goToDetailScreen(item.id)
                    }}>
                        <i className="fa fa-eye fa-sm text-white"/>
                    </Button> : null
                }
                {!isHideDeleteIcon ?
                    <Button className="ml-2" color="danger" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(false, item, true)
                    }}>
                        <i className="cui-trash icon font-md"/>
                    </Button> : null}
            </>
    );
};

ModalAction.propTypes = {
    item: PropTypes.object,
    isEditMode: PropTypes.bool,
    isHideEditIcon: PropTypes.bool,
    isHideDetailIcon: PropTypes.bool,
    isHideDeleteIcon: PropTypes.bool,
    onOpenModal: PropTypes.func,
    goToEditItem: PropTypes.func,
    goToDetailScreen: PropTypes.func,
};

export default ModalAction;
