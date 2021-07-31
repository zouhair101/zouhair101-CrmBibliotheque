import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Spinner} from 'reactstrap';
import moment from 'moment';
import {sendMail} from '../../store/actions/bookCirculationAction';
import {bookCirculationStatusConstant} from '../../constants';

const MailSend = (props) => {
    const { return_due_date, book_item_id, sendMail, status } = props;
    const [loader, setLoader] = useState(false);

    const SendMail = () => {
        setLoader(true);
        sendMail(book_item_id, (res) => {
            if(res) {
                setLoader(false);
            }
        });
    };

    return (
        <div>
            {
                status === bookCirculationStatusConstant.BOOK_ISSUED &&
                    return_due_date < moment(new Date()).format("YYYY-MM-DD hh:mm:ss") ?
                    <Button color="success" size="sm" onClick={() => SendMail()}>
                        { loader ?
                            <Spinner className="text-white" as="span" animation="border" size="sm"
                                role="status" aria-hidden="true" /> :
                            <i className="fa fa-envelope fa-sm text-white"/>}
                    </Button>
                : null
            }
        </div>
    )
};

MailSend.prototype = {
    sendMail: PropTypes.func,
}

export default connect(null,{ sendMail })(MailSend);
