import React, {useState} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {environment} from '../../../environment';

const ImportBookForm = (props) => {
    const { handleSubmit, onSaveImportData } = props;
    const [file, setFile] = useState(null);

    const onSave = () => {
        onSaveImportData(file);
    };

    const onChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
            <Row>
                <Col xs={12}>
                    <label className="file">
                        <span className="text-primary">
                            {getFormattedMessage('books.items.choose-btn.label')}
                        </span>
                        <input className="file__input-type" name="file" type="file"
                            onChange={onChange} accept=".xlsx, .xls, .csv"/>
                    </label>
                    <span className="ml-2 text-primary">
                        {file ? file.name : getFormattedMessage('books.items.no-file-chosen-text')}
                    </span>
                </Col>
                <Col xs={12} className="mt-2">
                    <span className="sample-file-text">
                        {getFormattedMessage('books.items.download-sample-file.text')}
                    </span>
                    <span className="ml-1">
                        <a target="_blank" href={`${environment.URL}/sample.xlsx`}>
                            {getFormattedMessage('books.items.here.text')}.
                        </a>
                    </span>
                </Col>
                <Col xs={12}>
                    <Button className="float-right" size="md" color="primary ml-2" disabled={!file} onClick={()=>onSave()}>
                        {getFormattedMessage('global.input.submit-btn.label')}
                    </Button>
                </Col>
            </Row>
    );
};

ImportBookForm.propTypes = {
    onSaveImportData: PropTypes.func,
}

export default reduxForm({ form: 'importBookForms'})(ImportBookForm);
