import React, {useState,useEffect} from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Books.scss';
import {publicImagePath} from '../../../appConstant';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import DeleteBook from './DeleteBook';
import HeaderTitle from '../../../shared/header-title/HeaderTitle';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import {Routes, icon} from "../../../constants";
import {getFormattedMessage, prepareFullNames, getFormattedOptions} from '../../../shared/sharedMethod';
import ReactDataTable from '../../../shared/table/ReactDataTable';
import {fetchBooks, exportBook} from '../../store/actions/bookAction';
import {toggleModal} from '../../../store/action/modalAction';
import {toggleImportBookModal} from '../../store/actions/toggleImportBookModal';
import Viewer from 'react-viewer';
import ImportBook from './ImportBook';
import {Dropdown} from 'react-bootstrap';
import {importBookByFile} from '../../store/actions/fileAction';
import {environment} from '../../../environment';
import {bookFilterOptions, storageKey} from "../../constants";

const Books = (props) => {
    const { books, history, isLoading, toggleModal, totalRecord, fetchBooks,
        toggleImportBookModal, exportBook, importBookByFile } = props;
    const [visible, setVisible] = useState(false);
    const [importBook, setImportBook] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [book, setBook] = useState(null);
    const bookStatusFilter = getFormattedOptions(bookFilterOptions);
    const cardModalProps = {
        book,
        toggleModal,
    };

    const onChange = (filter) => {
        fetchBooks(filter, history, true);
    };

    const onClickModal = () => {
        setImportBook(true);
        toggleImportBookModal();
    };

    const onClickExport = () => {
        exportBook((res) => {
            if(res.url) {
                window.open(res.url, "_self")
            }
        });
    };

    const onOpenModal = (book = null) => {
        setBook(book);
        toggleModal();
    };

    const openImage = (imageUrl) => {
        if (imageUrl !== null && imageUrl !== '') {
            setImageUrl(imageUrl);
            setVisible(true);
        }
    };

    const goToBookDetail = (bookId) => {
        history.push(`${Routes.BOOKS + bookId}/details`);
    };

    const columns = [
        {
            name: getFormattedMessage('books.table.cover.column'),
            selector: 'image',
            width: '100px',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => {
                const imageUrl = row.image_path ? row.image_path : publicImagePath.BOOK_AVATAR;
                return (
                    <div>
                        <img onClick={() => {
                            openImage(imageUrl);
                        }} src={imageUrl} height="50" alt={imageUrl}/>
                    </div>
                )
            },
        },
        {
            name: getFormattedMessage('books.input.isbn.label'),
            selector: 'isbn',
            width: '140px',
            sortable: true,
            cell: row => row.isbn
        },
        {
            name: getFormattedMessage('books.table.book.column'),
            selector: 'name',
            sortable: true,
            wrap: true,
            cell: row => row.name
        },
        {
            name: getFormattedMessage('authors.title'),
            selector: 'author_name',
            sortable: true,
            cell: row => {
                row.author_name = prepareFullNames(row.authors).map((({ name }) => name)).join(',  ');
                return <span>{row.author_name}</span>
            }
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '100px',
            cell: row => <ModalAction isHideEditIcon={true} isHideDetailIcon={false} goToDetailScreen={goToBookDetail}
                                      onOpenModal={onOpenModal} item={row} isEditMode={true}/>,
        },
    ];

    const onSaveImportData = async (data) => {
        const formData = new FormData();
        formData.append('file', data);
        importBookByFile(formData, (res) => {
            if (res.status) {
                fetchBooks();
            }
        });
        toggleImportBookModal();
    };

    const importBookModalProps = {
        onSaveImportData,
        toggleImportBookModal
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Books"/>
                <h5 className="page-heading">{getFormattedMessage('books.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle className="btn btn-primary ml-2" id="dropdown-basic" >
                            {getFormattedMessage('react-data-table.action.column')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href={`#${Routes.BOOKS}new`}>
                                {getFormattedMessage('books.input.new-btn.label')}
                            </Dropdown.Item>
                            <Dropdown.Item href={`#${Routes.BOOKS}import-book`}>
                                {getFormattedMessage('books.input.import-btn.label')}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => onClickModal()}>
                                {getFormattedMessage('books.import-file-btn.label')}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => onClickExport()}>
                                {getFormattedMessage('books.export-btn.label')}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {importBook ?
                    <ImportBook {...importBookModalProps} />
                : null}
                <Viewer drag={false} changeable={false} loop={false} zIndex={1100} scalable={false}
                        noNavbar={true} visible={visible} disableMouseZoom={true} onClose={() => {
                    setVisible(false);
                }} images={[{src: imageUrl, alt: ''}]}
                />
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={books} columns={columns} loading={isLoading} isShowFilterField
                                            emptyStateMessageId="books.empty-state.title" totalRows={totalRecord}
                                            filterKeyName={storageKey.BOOK} filterOptions={bookStatusFilter}
                                            emptyNotFoundStateMessageId="book.not-found.empty-state.title"
                                            onChange={onChange} icon={(icon.BOOK)}/>
                            <DeleteBook {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Books.propTypes = {
    books: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBooks: PropTypes.func,
    exportBook: PropTypes.func,
    toggleModal: PropTypes.func,
    importBookByFile: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { books, isLoading, totalRecord } = state;
    return { books, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchBooks, exportBook, toggleModal, toggleImportBookModal, importBookByFile })(Books);
