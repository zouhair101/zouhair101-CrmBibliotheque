import React, {useState, useEffect} from 'react';
import {
    Card,
    CardBody,
    Col,
    Row,
} from 'reactstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './Dashboard.scss';
import Charts from './charts/Charts';
import {prepareBarChart, prepareMonthlyBarChart, prepareCards} from "./prepareChartData";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {fetchDashBoardDetails} from "../../store/actions/dashBoardAction";
import {dateFormatter, getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {chartLabels, chartLabelSelector, storageKey} from "../../constants";
import moment from "moment/moment";
import {dateFormat, Filters, icon, Routes} from "../../../constants";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {environment} from '../../../environment';
import {fetchBooksCirculation} from '../../store/actions/bookCirculationAction';

const Dashboard = (props) => {
    const { fetchDashBoardDetails, dashBoard, isLoading, totalRecord, fetchBooksCirculation, booksCirculation } = props;
    const [typeOfData, setTypeOfData] = useState('general');
    const [selectedMinDate, setSelectedMinDate] = useState(moment().startOf('month').toDate());
    const [selectedMaxDate, setSelectedMaxDate] = useState(moment().endOf('month').toDate());
    const labels = getFormattedOptions(chartLabels).map((({ name }) => name));
    const [searchText, setSearchValue] = useState('');
    const [bookHistoryTableHeader, setBookHistoryTableHeader] = useState('');
    const [bookCirculation, setBookCirculation] = useState(false);

    useEffect(() => {
        fetchDashBoardDetails();
    }, []);

    if (_.isEmpty(dashBoard) || !dashBoard.general) {
        return <ProgressBar/>;
    }
    const { general } = dashBoard;
    const totalCard = prepareCards(general, labels);

    const renderChartData = (chartData, type) => {
        const inputToady = moment().format(dateFormat.CHART_CUSTOM_DATE);
        const inputNextWeek = moment().add(1, 'week').format(dateFormat.CHART_CUSTOM_DATE);
        const inputLastWeek = moment().subtract(1, 'week').format(dateFormat.CHART_CUSTOM_DATE);
        const inputStartMonth = moment().startOf('month').format(dateFormat.CHART_CUSTOM_DATE);
        const inputNextMonth = moment().endOf('month').format(dateFormat.CHART_CUSTOM_DATE);
        const inputStartOfLastMonth = moment().subtract(1, 'months').startOf('month').format(dateFormat.CHART_CUSTOM_DATE);
        const inputEndOfLastMonth = moment().subtract(1, 'months').endOf('month').format(dateFormat.CHART_CUSTOM_DATE);
        const inputInterStartMediateDate = moment(selectedMinDate).format(dateFormat.CHART_CUSTOM_DATE);
        const inputInterMediateEndDate = moment(selectedMaxDate).format(dateFormat.CHART_CUSTOM_DATE);

        const { general, today, currentWeek, lastWeek, currentMonth, lastMonth, interMonth } = chartData;
        if (type === chartLabelSelector.TODAY && today) {
            return prepareBarChart(today, labels, inputToady)
        } else if (type === chartLabelSelector.THIS_WEEK && currentWeek) {
            return prepareMonthlyBarChart(currentWeek, labels, inputToady, inputNextWeek);
        } else if (type === chartLabelSelector.LAST_WEEK && lastWeek) {
            return prepareMonthlyBarChart(lastWeek, labels, inputLastWeek, inputToady);
        } else if (type === chartLabelSelector.THIS_MONTH && currentMonth) {
            return prepareMonthlyBarChart(currentMonth, labels, inputStartMonth, inputNextMonth);
        } else if (type === chartLabelSelector.LAST_MONTH && lastMonth) {
            return prepareMonthlyBarChart(lastMonth, labels, inputStartOfLastMonth, inputEndOfLastMonth);
        }
        else if (type === chartLabelSelector.CUSTOM && interMonth) {
            return prepareMonthlyBarChart(interMonth, labels, inputInterStartMediateDate, inputInterMediateEndDate);
        } else {
            return prepareBarChart(general, labels);
        }
    };

    const onMonthSelector = (params = {}) => {
        fetchDashBoardDetails(params);
    };

    const chartOptions = {
        general, chartData: renderChartData(dashBoard, typeOfData), onMonthSelector, setTypeOfData,
        selectedMinDate, setSelectedMinDate, selectedMaxDate, setSelectedMaxDate
    };

    const onChange = (filter) => {
        if (!filter.search) {
            filter.search = searchText;
        }
        fetchBooksCirculation(filter, () => {
            window.scrollTo({left: 0,top:document.body.scrollHeight, behavior: "smooth"});
        });
    };

    const onClickFetchBooksCirculation = (searchValues) => {
        if (searchValues.title === "Members") {
            return (
                window.location.href = environment.URL + '/#' + Routes.MEMBERS
            )
        } else if (searchValues.title === "Books") {
            return (
                window.location.href = environment.URL + '/#' + Routes.BOOKS
            )
        } else if (searchValues.count > 0) {
            setBookHistoryTableHeader(searchValues.title);
            setBookCirculation(true);
            const filters = {
                order_By: Filters.OBJ.order_By,
                limit: Filters.OBJ.limit,
                skip: 0,
                direction: Filters.OBJ.direction,
                search: searchValues.title === "Overdue Books" ? "overdue"
                    : searchValues.title === "Reserved Books" ? "reserved"
                        : searchValues.title === "Issued Books" ? "issued" : null
            };
            setSearchValue(filters.search);
            fetchBooksCirculation(filters, (res) => {
                if (res.status) {
                    window.scrollTo({left: 0,top:document.body.scrollHeight, behavior: "smooth"});
                }
            });
        }
    };

    const renderCards = () => {
        return totalCard.map((card, index) => (
            <Col key={index} className="dashboard__card-wrapper col-12 col-sm-6 col-lg-3">
                <Card className={`text-white ${card.color}`}>
                    <CardBody onClick={() => onClickFetchBooksCirculation(card)}
                        className={`${card.count > 0 ? "dashboard__card-body" : null}`}>
                        <div className="dashboard__card-count">{card.count}</div>
                        <div className="dashboard__card-icon">
                            <i className={card.icon}/>
                        </div>
                        <div className="dashboard__card-title text-nowrap">{card.title}</div>
                    </CardBody>
                </Card>
            </Col>
        ));
    };

    const columns = [
        {
            name: getFormattedMessage('books-circulation.select.book.label'),
            selector: 'name',
            sortable: true,
            wrap: true,
            cell: row => row.name = row.book_item.book.name
        },
        {
            name: getFormattedMessage('books-circulation.select.book-item.label'),
            selector: 'book_code',
            width: '140px',
            sortable: true,
            cell: row => row.book_code = row.book_item.book_code
        },
        {
            name: getFormattedMessage('books-circulation.select.member.label'),
            selector: 'member_name',
            width: '140px',
            sortable: true,
            cell: row => <span>{row.member.first_name + ' ' + row.member.last_name}</span>
        },
        {
            name: getFormattedMessage('books-circulation.table.issue-date.column'),
            selector: 'issued_on',
            width: '160px',
            sortable: true,
            cell: row => <span>{ row.issued_on ? dateFormatter(row.issued_on) : 'N/A' }</span>
        },
        {
            name: getFormattedMessage('books-circulation.table.return-date.column'),
            selector: 'return_due_date',
            width: '160px',
            sortable: true,
            cell: row => <span>{ row.return_due_date ? dateFormatter(row.return_due_date) : 'N/A'} </span>
        },
    ];

    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2">
                    {isLoading ? <ProgressBar/> : null}
                    <HeaderTitle title="Dashboard"/>
                    <h5 className="page-heading">{getFormattedMessage('dashboard.title')}</h5>
                </Col>
                {renderCards()}
            </Row>
            <Charts {...chartOptions}/>
            {
                bookCirculation ?
                    <Row>
                        <Col sm={12}>
                            <h5 className="page-heading">{bookHistoryTableHeader}</h5>
                        </Col>
                        <Col sm={12}>
                            <div className="sticky-table-container">
                                <Card>
                                    <CardBody>
                                        <ReactDataTable items={booksCirculation}
                                            emptyStateMessageId="dashboard.empty-state.title"
                                            emptyNotFoundStateMessageId="dashboard.not-found.empty-state.title"
                                            filterKeyName={storageKey.BOOK_CIRCULATION}
                                            columns={columns} loading={isLoading} totalRows={totalRecord}
                                            onChange={onChange} icon={(icon.BOOK_CIRCULATION)}/>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                : null
            }
        </div>
    );
};

Dashboard.propTypes = {
    dashBoard: PropTypes.object,
    isLoading: PropTypes.bool,
    fetchDashBoardDetails: PropTypes.func,
    booksCirculation: PropTypes.array,
    totalRecord: PropTypes.number,
    fetchBooksCirculation: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { booksCirculation, dashBoard, isLoading, totalRecord } = state;
    return {booksCirculation, dashBoard, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchBooksCirculation: fetchBooksCirculation, fetchDashBoardDetails })(Dashboard);
