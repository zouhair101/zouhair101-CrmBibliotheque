import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import CustomInput from './CustomInput';

const SearchField = (props) => {
    const { handleSearch } = props;
    const [typingTimeout, setTypingTimeout] = useState(0);

    const sendToParent = (searchText) => {
        handleSearch(searchText);
    };

    const onChangeName = (event) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(() => sendToParent(event.target.value), 500));
    };

    return (
        <Field name="search-text" type="search" placeholder="global.input.search-btn.label" groupText="search"
               isCustom={true} onChange={(e) => onChangeName(e)} component={CustomInput}/>
    );
};

SearchField.propTypes = {
    handleSearch: PropTypes.func
};

export default reduxForm({ form: 'searchForm' })(SearchField);
