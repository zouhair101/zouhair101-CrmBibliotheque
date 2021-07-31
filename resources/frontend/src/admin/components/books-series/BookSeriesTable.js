import React from 'react';
import {Table} from 'reactstrap';
import PropTypes from 'prop-types';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const BookSeriesTable = (props) => {
    const { booksSeries, onOpenModal, sortAction, sortObject, history } = props;
    const headers = [
        { id: 'title', name: getFormattedMessage('books-series.input.title.label') },
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers };
    const goToEditSeriesBook = (bookId) => {
        history.push(`/app/admin/books-series/${bookId}/edit`);
    };
    return (
        <div className="overflow-auto">
            <Table hover bordered striped responsive size="md">
                <thead>
                    <TableHeader{...headerProps}/>
                </thead>
                <tbody>
                {booksSeries.map((bookSeries) => {
                        return (
                            <tr key={bookSeries.id.toString()}>
                                <td>{bookSeries.title}</td>
                                <td className="text-center">
                                    <ModalAction onOpenModal={onOpenModal} item={bookSeries} isEditMode={true}
                                                 goToEditItem={goToEditSeriesBook}/>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
        </div>
    );
};

BookSeriesTable.propTypes = {
    sortObject: PropTypes.object,
    history: PropTypes.object,
    booksSeries: PropTypes.array,
    sortAction: PropTypes.func,
    onOpenModal: PropTypes.func,
};

export default BookSeriesTable;
