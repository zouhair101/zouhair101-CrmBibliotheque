import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import CustomInput from "../../../shared/components/CustomInput";
import {Button, Col, ListGroup, ListGroupItem, Popover, PopoverBody, PopoverHeader, Row} from "reactstrap";
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {chartLabels, chartLabelSelector} from "../../constants";
import DatePicker from "../../../shared/components/DatePicker";
import moment from "moment";
import {dateFormat} from "../../../constants";
import "./DateRangePicker.scss";

const DateRangePicker = (props) => {
    const { change, onDateSelector } = props;
    const [selectedMinDate, setSelectedMinDate] = useState(moment().startOf('month').toDate());
    const [selectedMaxDate, setSelectedMaxDate] = useState(moment().endOf('month').toDate());
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [applyButton, setApplyButton] = useState(false);
    const [childPopoverOpen, setChildPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const toggleChild = () => setChildPopoverOpen(!childPopoverOpen);
    const today = moment().format(dateFormat.NATIVE);
    const nextWeek = moment().add(1, 'week').format(dateFormat.NATIVE);
    const lastWeek = moment().subtract(1, 'week').format(dateFormat.NATIVE);
    const startMonth = moment().startOf('month').format(dateFormat.NATIVE);
    const nextMonth = moment().endOf('month').format(dateFormat.NATIVE);
    const startOfLastMonth = moment().subtract(1, 'months').startOf('month').format(dateFormat.NATIVE);
    const endOfLastMonth = moment().subtract(1, 'months').endOf('month').format(dateFormat.NATIVE);
    const interStartMediateDate = moment(selectedMinDate).format(dateFormat.NATIVE);
    const interMediateEndDate = moment(selectedMaxDate).format(dateFormat.NATIVE);
    const inputToady = moment().format(dateFormat.CHART_DATE);
    const inputNextWeek = moment().add(1, 'week').format(dateFormat.CHART_DATE);
    const inputLastWeek = moment().subtract(1, 'week').format(dateFormat.CHART_DATE);
    const inputStartMonth = moment().startOf('month').format(dateFormat.CHART_DATE);
    const inputNextMonth = moment().endOf('month').format(dateFormat.CHART_DATE);
    const inputStartOfLastMonth = moment().subtract(1, 'months').startOf('month').format(dateFormat.CHART_DATE);
    const inputEndOfLastMonth = moment().subtract(1, 'months').endOf('month').format(dateFormat.CHART_DATE);
    const inputInterStartMediateDate = moment(selectedMinDate).format(dateFormat.CHART_DATE);
    const inputInterMediateEndDate = moment(selectedMaxDate).format(dateFormat.CHART_DATE);

    const todayParams = {
        type: chartLabelSelector.TODAY,
        params: { start_date: today, end_date: today }
    };
    const currentWeekParams = {
        type: chartLabelSelector.THIS_WEEK,
        params: { start_date: today, end_date: nextWeek }
    };
    const lastWeekParams = {
        type: chartLabelSelector.LAST_WEEK,
        params: { start_date: lastWeek, end_date: today }
    };
    const currentMonthParams = {
        type: chartLabelSelector.THIS_MONTH,
        params: { start_date: startMonth, end_date: nextMonth }
    };
    const lastMonthParams = {
        type: chartLabelSelector.LAST_MONTH,
        params: { start_date: startOfLastMonth, end_date: endOfLastMonth }
    };
    const interMediateParams = {
        type: chartLabelSelector.CUSTOM,
        params: { start_date: interStartMediateDate, end_date: interMediateEndDate }
    };

    const onClickCustomRange = () => {
        setApplyButton(true);
    };

    const onSelectDate = (type) => {
        switch (type) {
            case chartLabelSelector.TODAY:
                change('date_selector', inputToady + '-' + inputToady);
                onDateSelector(todayParams);
                toggle();
                break;
            case chartLabelSelector.THIS_WEEK:
                change('date_selector', inputToady + '-' + inputNextWeek);
                onDateSelector(currentWeekParams);
                toggle();
                break;
            case chartLabelSelector.LAST_WEEK:
                change('date_selector', inputLastWeek + '-' + inputToady);
                onDateSelector(lastWeekParams);
                toggle();
                break;
            case chartLabelSelector.THIS_MONTH:
                change('date_selector', inputStartMonth + '-' + inputNextMonth);
                onDateSelector(currentMonthParams);
                toggle();
                break;
            case chartLabelSelector.LAST_MONTH:
                change('date_selector', inputStartOfLastMonth + '-' + inputEndOfLastMonth);
                onDateSelector(lastMonthParams);
                toggle();
                break;
            case chartLabelSelector.CUSTOM:
                change('date_selector', inputInterStartMediateDate + '-' + inputInterMediateEndDate);
                onDateSelector(interMediateParams);
                break;
            default:
                onDateSelector();
                break;
        }
    };

    const onSelectMinDate = (date) => {
        setSelectedMinDate(date);
    };

    const onSelectMaxDate = (date) => {
        setSelectedMaxDate(date);
    };

    return (
        <div>
            <div id="Popover1" >
                <Field name="date_selector" component={CustomInput} isCustom groupText="calendar-check-o" readOnly/>
            </div>

            <Popover trigger={!childPopoverOpen ? 'legacy' : ' '} placement="bottom" isOpen={popoverOpen}
                     target="Popover1" toggle={toggle}>
                <PopoverBody className="date-picker">
                    <ListGroup>
                        <ListGroupItem onClick={() => onSelectDate(chartLabelSelector.TODAY)}>
                            {getFormattedMessage('dashboard.chart.filter.today.label')}
                        </ListGroupItem>
                        <ListGroupItem onClick={() => onSelectDate(chartLabelSelector.THIS_WEEK)}>
                            {getFormattedMessage('dashboard.chart.filter.this-week.label')}
                        </ListGroupItem>
                        <ListGroupItem onClick={() => onSelectDate(chartLabelSelector.LAST_WEEK)}>
                            {getFormattedMessage('dashboard.chart.filter.last-week.label')}
                        </ListGroupItem>
                        <ListGroupItem onClick={() => onSelectDate(chartLabelSelector.THIS_MONTH)}>
                            {getFormattedMessage('dashboard.chart.filter.this-month.label')}
                        </ListGroupItem>
                        <ListGroupItem onClick={() => onSelectDate(chartLabelSelector.LAST_MONTH)}>
                            {getFormattedMessage('dashboard.chart.filter.last-month.label')}
                        </ListGroupItem>
                        <ListGroupItem>
                            <span id="Popover2" onClick={() => onClickCustomRange()}>
                                {getFormattedMessage('dashboard.chart.filter.custom.label')}
                            </span>
                            <Popover trigger="legacy" placement="left" className="date-picker__child-popover"
                                     isOpen={childPopoverOpen} target="Popover2" toggle={toggleChild}>
                                <PopoverBody className="mt-3">
                                    <Row>
                                        <Col xs={6}>
                                            <DatePicker
                                                selected={selectedMinDate}
                                                onChange={onSelectMinDate}
                                                shouldCloseOnSelect={false} startOpen={true}
                                                placeHolder="Click to select a date"/>
                                        </Col>
                                        <Col xs={6}>
                                            <DatePicker
                                                selected={selectedMaxDate}
                                                onChange={onSelectMaxDate}
                                                shouldCloseOnSelect={false} startOpen={true}
                                                placeHolder="Click to select a date"/>
                                        </Col>
                                    </Row>
                                </PopoverBody>
                            </Popover>
                        </ListGroupItem>
                        <div className="mt-3 text-center">
                            {
                                applyButton ?
                                    <Button color="primary" size="md" disabled={!childPopoverOpen}
                                            onClick={() => onSelectDate(chartLabelSelector.CUSTOM)}>
                                        {getFormattedMessage('global.input.apply-btn.label')}
                                    </Button> : null
                            }
                            <Button className={`${applyButton ? "ml-3" : null}`} color="secondary" size="md" onClick={() => toggle()}>
                                {getFormattedMessage('global.input.cancel-btn.label')}
                            </Button>
                        </div>
                    </ListGroup>
                </PopoverBody>
            </Popover>
        </div>
    )
};

DateRangePicker.propTypes = {
    filterKey: PropTypes.object,
    options: PropTypes.array,
    filterKeyName: PropTypes.string,
    initialize: PropTypes.func,
    handleFilter: PropTypes.func,
    change: PropTypes.func,
};

export default reduxForm({ form: 'dateForm' })(DateRangePicker);
