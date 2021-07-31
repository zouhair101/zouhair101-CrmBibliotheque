import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {searchFilter} from '../../store/action/searchAction';
import CustomInput from './CustomInput';

const CustomSearchField = (props) => {
    const { searchFilter } = props;

    useEffect(() => {
        searchFilter('');
    }, []);

    const searchRecords = (event) => {
        searchFilter(event.target.value);
    };

    return (
        <Field name="search-text" type="search" placeholder="global.input.search-btn.label" groupText="search"
               isCustom={true} onChange={searchRecords} component={CustomInput}/>
    );
};

CustomSearchField.propTypes = {
    searchFilter: PropTypes.func
};

const form = reduxForm({ form: 'searchForm' })(CustomSearchField);
export default connect(null, { searchFilter })(form);
