import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import Select from './Select';
import {getFormattedOptions} from "../sharedMethod";

const FilterField = (props) => {
    const { options, handleFilter, initialize, filterKey, filterKeyName } = props;
    const formattedOptions = getFormattedOptions(options);

    useEffect(() => {
        initialize({ filter_key: filterKey });
    }, []);

    const onChangeFilter = (option) => {
        if (option) {
            localStorage.setItem(filterKeyName, JSON.stringify(option));
            handleFilter(option.defaultValue ? option.defaultValue : option.name);
        } else {
            handleFilter();
        }
    };

    return (
        <Field name="filter_key" options={formattedOptions} groupText="filter" component={Select}
               placeholder="global.input.filter-btn.label" isSearchable={true} isCustom onChange={onChangeFilter}/>
    )
};

FilterField.propTypes = {
    filterKey: PropTypes.object,
    options: PropTypes.array,
    filterKeyName: PropTypes.string,
    initialize: PropTypes.func,
    handleFilter: PropTypes.func
};

export default reduxForm({ form: 'filterForm' })(FilterField);
