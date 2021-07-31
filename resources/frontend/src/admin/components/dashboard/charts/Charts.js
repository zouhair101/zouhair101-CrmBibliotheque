import React, {useState, useEffect} from 'react';
import {Bar, Doughnut, Pie} from 'react-chartjs-2';
import {reduxForm, Field} from 'redux-form';
import {
    Card, CardTitle, CardBody, CardColumns, CardHeader, Row, Col, ListGroup, ListGroupItem,
    Popover, PopoverHeader, PopoverBody, Button
} from 'reactstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import './Chart.scss';
import {barChartOptions, prepareDougnutChart, preparePieChart} from "../prepareChartData";
import EmptyComponent from '../../../../shared/empty-component/EmptyComponent';
import CustomInput from "../../../../shared/components/CustomInput";
import DatePicker from "../../../../shared/components/DatePicker";
import {dateFormat} from "../../../../constants";
import {chartLabels, chartLabelSelector} from "../../../constants";
import {getFormattedMessage, getFormattedOptions} from "../../../../shared/sharedMethod";
import {icon} from "../../../../constants";

const Charts = (props) => {
    const {
        general, onMonthSelector, setTypeOfData, chartData, change, initialize,
        selectedMinDate, setSelectedMinDate, selectedMaxDate, setSelectedMaxDate
    } = props;
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [childPopoverOpen, setChildPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    const toggleChild = () => setChildPopoverOpen(!childPopoverOpen);
    const labels = getFormattedOptions(chartLabels).map((({ name }) => name));

    useEffect(() => {
        initialize({
            date_selector: moment().format(dateFormat.CHART_DATE)
            + '-' + moment().format(dateFormat.CHART_DATE)
        })
    }, []);

    if (!general) {
        return null;
    }

    const doughnut = prepareDougnutChart(general, labels);
    const pie = preparePieChart(general);

    const renderEmptyDataSet = (dataSet) => {
        return dataSet[0].data.reduce((a, b) => a + b, 0);
    };
    const renderEmptyBarChart = (dataSet) => {
        const data = [];
        dataSet.forEach(d => data.push(...d.data));
        return data.reduce((a, b) => a + b, 0);
    };

    const renderMonthSelector = () => {
        const today = moment().format(dateFormat.DEFAULT_MOMENT);
        const nextWeek = moment().add(1, 'week').format(dateFormat.DEFAULT_MOMENT);
        const lastWeek = moment().subtract(1, 'week').format(dateFormat.DEFAULT_MOMENT);
        const startMonth = moment().startOf('month').format(dateFormat.DEFAULT_MOMENT);
        const nextMonth = moment().endOf('month').format(dateFormat.DEFAULT_MOMENT);
        const startOfLastMonth = moment().subtract(1, 'months').startOf('month').format(dateFormat.DEFAULT_MOMENT);
        const endOfLastMonth = moment().subtract(1, 'months').endOf('month').format(dateFormat.DEFAULT_MOMENT);
        const interStartMediateDate = moment(selectedMinDate).format(dateFormat.DEFAULT_MOMENT);
        const interMediateEndDate = moment(selectedMaxDate).format(dateFormat.DEFAULT_MOMENT);
        const inputToady = moment().format(dateFormat.CHART_DATE);
        const inputNextWeek = moment().add(1, 'week').format(dateFormat.CHART_DATE);
        const inputLastWeek = moment().subtract(1, 'week').format(dateFormat.CHART_DATE);
        const inputStartMonth = moment().startOf('month').format(dateFormat.CHART_DATE);
        const inputNextMonth = moment().endOf('month').format(dateFormat.CHART_DATE);
        const inputStartOfLastMonth = moment().subtract(1, 'months').startOf('month').format(dateFormat.CHART_DATE);
        const inputEndOfLastMonth = moment().subtract(1, 'months').endOf('month').format(dateFormat.CHART_DATE);
        const inputInterStartMediateDate = moment(selectedMinDate).format(dateFormat.CHART_DATE);
        const inputInterMediateEndDate = moment(selectedMaxDate).format(dateFormat.CHART_DATE);
        const todayParams = { type: chartLabelSelector.TODAY, params: { today: true } };
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

        const onSelectDate = (type) => {
            switch (type) {
                case chartLabelSelector.TODAY:
                    onMonthSelector(todayParams);
                    change('date_selector', inputToady + '-' + inputToady);
                    setTypeOfData(chartLabelSelector.TODAY);
                    break;
                case chartLabelSelector.THIS_WEEK:
                    change('date_selector', inputToady + '-' + inputNextWeek);
                    setTypeOfData(chartLabelSelector.THIS_WEEK);
                    onMonthSelector(currentWeekParams);
                    break;
                case chartLabelSelector.LAST_WEEK:
                    change('date_selector', inputLastWeek + '-' + inputToady);
                    setTypeOfData(chartLabelSelector.LAST_WEEK);
                    onMonthSelector(lastWeekParams);
                    break;
                case chartLabelSelector.THIS_MONTH:
                    change('date_selector', inputStartMonth + '-' + inputNextMonth);
                    setTypeOfData(chartLabelSelector.THIS_MONTH);
                    onMonthSelector(currentMonthParams);
                    break;
                case chartLabelSelector.LAST_MONTH:
                    change('date_selector', inputStartOfLastMonth + '-' + inputEndOfLastMonth);
                    setTypeOfData(chartLabelSelector.LAST_MONTH);
                    onMonthSelector(lastMonthParams);
                    break;
                case chartLabelSelector.CUSTOM:
                    change('date_selector', inputInterStartMediateDate + '-' + inputInterMediateEndDate);
                    setTypeOfData(chartLabelSelector.CUSTOM);
                    onMonthSelector(interMediateParams);
                    break;
                default:
                    onMonthSelector();
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
                <span id="Popover1" className="float-right">
                    <Field name="date_selector" component={CustomInput} isCustom readOnly groupText="calendar-check-o"/>
                </span>
                <Popover trigger={!childPopoverOpen ? 'legacy' : ' '} placement="bottom" isOpen={popoverOpen}
                         target="Popover1" toggle={toggle}>
                    <PopoverHeader>{getFormattedMessage('global.input.filter-btn.label')}</PopoverHeader>
                    <PopoverBody>
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
                                <span id="Popover2">
                                    {getFormattedMessage('dashboard.chart.filter.custom.label')}
                                </span>
                                <Popover trigger="legacy" className="charts__child-popover" placement="left"
                                         isOpen={childPopoverOpen} target="Popover2" toggle={toggleChild}>
                                    <PopoverBody className="mt-3">
                                        <Row>
                                            <Col xs={6}>
                                                <DatePicker selected={selectedMinDate} onChange={onSelectMinDate}
                                                            shouldCloseOnSelect={false} startOpen={true}
                                                            placeHolder="Click to select a date"/>
                                            </Col>
                                            <Col xs={6}>
                                                <DatePicker selected={selectedMaxDate} onChange={onSelectMaxDate}
                                                            shouldCloseOnSelect={false} startOpen={true}
                                                            placeHolder="Click to select a date"/>
                                            </Col>
                                        </Row>
                                    </PopoverBody>
                                </Popover>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button color="primary" size="sm" disabled={!childPopoverOpen}
                                        onClick={() => onSelectDate(chartLabelSelector.CUSTOM)}>
                                    {getFormattedMessage('global.input.apply-btn.label')}
                                </Button>
                                <Button className="ml-1" color="secondary" size="sm" onClick={() => toggle()}>
                                    {getFormattedMessage('global.input.cancel-btn.label')}
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </PopoverBody>
                </Popover>
            </div>
        );
    };

    const options = {
        legend: { display: false },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const count = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                    return ' ' + data.labels[tooltipItem.index] + ' : ' + count;
                },
            },
        },
    }
    const BookCirculationOptions = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const count = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                    return ' ' + data.labels[tooltipItem.index] + ' : ' + count;
                },
            },
        },
    }
    return (
        <div className="charts">
            <Row>
                <Col>
                    <div className="animated fadeIn">
                        <CardColumns className="cols-2">
                            <Card>
                                <CardHeader>
                                    {getFormattedMessage('dashboard.chart.circulation-report.title')}
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-wrapper chart-wrapper-content">
                                        {renderEmptyDataSet(doughnut.datasets) ? <Doughnut data={doughnut} options={BookCirculationOptions}/> :
                                            <div className="chart-wrapper-empty-component">
                                                <EmptyComponent isShort title={getFormattedMessage
                                                ('dashboard.chart.empty-message.label')} icon={(icon.BOOK_CIRCULATION)}/>
                                            </div>}
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>
                                    {getFormattedMessage('dashboard.chart.book&member-report.title')}
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-wrapper chart-wrapper-content">
                                        {renderEmptyDataSet(pie.datasets) ?
                                            <Pie data={pie} options={options}/> :
                                            <div className="chart-wrapper-empty-component">
                                                <EmptyComponent isShort title={getFormattedMessage
                                                ('dashboard.chart.empty-message.label')} icon={(icon.BOOK)}/>
                                            </div>
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                        </CardColumns>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

Charts.propTypes = {
    dashBoard: PropTypes.object,
    general: PropTypes.object,
    chartData: PropTypes.object,
    setSelectedMinDate: PropTypes.func,
    setSelectedMaxDate: PropTypes.func,
    setTypeOfData: PropTypes.func,
    onMonthSelector: PropTypes.func,
    change: PropTypes.func,
    initialize: PropTypes.func,
};

export default reduxForm({ form: 'chart' })(Charts);
