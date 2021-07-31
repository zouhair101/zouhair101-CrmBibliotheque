import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Routes} from "../../../constants";
import ModalAction from '../../../shared/action-buttons/ModalAction';
import BookStatus from "../../../shared/book-status/book-status";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {fetchMemberBooksHistory} from "../../store/actions/memberBookHistoryAction";

const MemberBookHistory = (props) => {
    const {
        memberId, memberBookHistory, onClickModal,
        history, isLoading, totalRecord, fetchMemberBooksHistory
    } = props;
    const columns = [
        {
            name: getFormattedMessage('books.table.book.column'),
            selector: 'name',
            minWidth: '150px',
            sortable: true,
            wrap: true,
            cell: row => row.name = row.book_item.book.name
        },
        {
            name: getFormattedMessage('books-circulation.select.book-item.label'),
            selector: 'book_code',
            width: '120px',
            sortable: true,
            cell: row => row.book_code = row.book_item.edition + ` (${row.book_item.book_code})`
        },
        {
            name: getFormattedMessage('react-data-table.status.column'),
            width: '100px',
            center: true,
            selector: 'status',
            sortable: true,
            cell: row => <BookStatus status={row.status} item={row}/>
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '120px',
            cell: row => <ModalAction onOpenModal={onClickModal} isHideDeleteIcon={true} isHideDetailIcon={false}
                                      goToDetailScreen={gotToBookHistoryDetail} item={row}/>,
        }];

    const gotToBookHistoryDetail = (bookCirculationId) => {
        history.push(`${Routes.BOOKS_CIRCULATION + bookCirculationId}/details`);
    };

    const onChange = (filter) => {
        fetchMemberBooksHistory(memberId, filter);
    };

    return (
        <ReactDataTable items={memberBookHistory} defaultLimit={5} isShortEmptyState
                        emptyStateMessageId="book-history.empty-state.title"
                        paginationRowsPerPageOptions={[5, 10, 15, 25, 50, 100]} isShowSearchField={false}
                        columns={columns} loading={isLoading} totalRows={totalRecord} onOpenModal={onClickModal}
                        onChange={onChange}/>
    );
};

MemberBookHistory.propTypes = {
    history: PropTypes.object,
    memberBookHistory: PropTypes.array,
    memberId: PropTypes.number,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchMemberBooksHistory: PropTypes.func,
    MemberBookHistory: PropTypes.func,
    onClickModal: PropTypes.func
};

const mapStateToProps = (state) => {
    const { memberBookHistory, totalRecord, isLoading } = state;
    return { memberBookHistory, totalRecord, isLoading }
};

export default connect(mapStateToProps, { fetchMemberBooksHistory })(MemberBookHistory);
