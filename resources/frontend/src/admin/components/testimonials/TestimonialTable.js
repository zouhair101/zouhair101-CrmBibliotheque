import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Testimonials.scss';
import {publicImagePathURL} from '../../../appConstant';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {getAvatarName} from "../../../shared/sharedMethod";
import {addToast} from '../../../store/action/toastAction';
import {icon} from "../../../constants";

const TestimonialTable = (props) => {
    const { testimonials, onClickModal, isLoading, totalRecord, onChangeData } = props;
    const columns = [
        {
            name: getFormattedMessage('react-data-table.image.column'),
            selector: 'image',
            width: '90px',
            cell: row => {
                const imageUrl = row.image_path ? row.image_path : null;
                if (imageUrl)
                    return <img src={imageUrl ? imageUrl : null} className="testimonial-table-row__profile-img"
                                alt={imageUrl}/>;
                return <div className="user__avatar">
                    <span>{getAvatarName(row.name)}</span>
                </div>;
            }
        },
        {
            name: getFormattedMessage('react-data-table.name.column'),
            selector: 'name',
            sortable: true,
            minWidth: '200px'
        },
        {
            name: getFormattedMessage('react-data-table.occupation.column'),
            selector: 'occupation',
            sortable: true,
            minWidth: '200px'
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true,
            width: '150px',
            cell: row => <ModalAction onOpenModal={onClickModal} item={row}/>
        }];

    return (
        <ReactDataTable items={testimonials} columns={columns} icon={(icon.TESTIMONIAL)}
                        emptyStateMessageId="testimonials.empty-state.title"
                        emptyNotFoundStateMessageId="testimonials.not-found.empty-state.title"
                        loading={isLoading} totalRows={totalRecord} onChange={onChangeData}/>
    );
};

TestimonialTable.propTypes = {
    history: PropTypes.object,
    testimonials: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    onChangeData: PropTypes.func,
    onClickModal: PropTypes.func,
};

const testimonialForm = reduxForm({ form: 'testimonialForm' })(TestimonialTable);
export default connect(null, { addToast })(testimonialForm);
