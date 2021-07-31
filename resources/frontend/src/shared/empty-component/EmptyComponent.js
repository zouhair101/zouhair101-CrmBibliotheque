import React from 'react';
import PropTypes from 'prop-types';
import './EmptyComponent.scss';

const EmptyComponent = (props) => {
    const { title, isShort, isMediumEmptyState, isLoading, isShortEmptyState, icon } = props;
    const prepareClassName = () => {
        if (isMediumEmptyState) {
            return 'empty-component empty-component--mid';
        }
        if (isShortEmptyState) {
            return 'empty-component empty-component--too-short';
        }
        if (isShort) {
            return 'empty-component empty-component--mini';
        }
        return 'empty-component empty-component--maxi';
    };

    return (
        <div className={prepareClassName()}>
            {!isLoading ? <i className={icon === undefined ? "fa fa-2x fa-ban" : icon}/> : <i className="fa fa-2x fa-spinner"/>}
            <h5 className="empty-component__title">{title}</h5>
        </div>
    );
};

EmptyComponent.propTypes = {
    title: PropTypes.object,
    isShort: PropTypes.bool,
    isMediumEmptyState: PropTypes.bool,
    isShortEmptyState: PropTypes.bool,
    isLoading: PropTypes.bool
};

export default EmptyComponent;
