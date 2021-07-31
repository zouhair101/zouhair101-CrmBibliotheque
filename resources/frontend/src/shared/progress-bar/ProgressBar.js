import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TopBarProgress from 'react-topbar-progress-indicator';
import progressConfig from '../../config/progressbarConfig';

TopBarProgress.config({ progressConfig });

const ProgressBar = (props) => {
    const { isLoading } = props;

    return isLoading ? <TopBarProgress/> : null;
};

ProgressBar.propTypes = {
    isLoading: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.isLoading || ownProps.isLoading
    };
};

export default connect(mapStateToProps)(ProgressBar);
