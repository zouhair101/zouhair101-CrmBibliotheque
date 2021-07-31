import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {Tab, Tabs} from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from "lodash";
import HomeSettingsForm from "./HomeSettingsForm";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {homeSettingsKey} from "../../../constants";
import {fetchHomeSettings, postHomeSettings} from "../../store/actions/settingAction";
import Cards from "../cards/Card";

const HomeSettings = (props) => {
    const {fetchHomeSettings, postHomeSettings, homeSettings} = props;

    useEffect(() => {
        fetchHomeSettings(true);
    }, []);

    const onSaveHomeSettings = (formValues) => {
        postHomeSettings([...formValues]);
    };

    const prepareFormOption = {
        initialValues: {
            facebook: homeSettings[homeSettingsKey.FACEBOOK] ? homeSettings[homeSettingsKey.FACEBOOK].value : null,
            github: homeSettings[homeSettingsKey.GITHUB] ? homeSettings[homeSettingsKey.GITHUB].value : null,
            linkedin: homeSettings[homeSettingsKey.LINKEDIN] ? homeSettings[homeSettingsKey.LINKEDIN].value : null,
            twitter: homeSettings[homeSettingsKey.TWITTER] ? homeSettings[homeSettingsKey.TWITTER].value : null,
            contact_email: homeSettings[homeSettingsKey.CONTACT_EMAIl] ? homeSettings[homeSettingsKey.CONTACT_EMAIl].value : null,
            contact_phone: homeSettings[homeSettingsKey.CONTACT_PHONE] ? homeSettings[homeSettingsKey.CONTACT_PHONE].value : null,
            company_description: homeSettings[homeSettingsKey.COMPANY_DESCRIPTION] ? homeSettings[homeSettingsKey.COMPANY_DESCRIPTION].value : null,
            website: homeSettings[homeSettingsKey.WEBSITE] ? homeSettings[homeSettingsKey.WEBSITE].value : null,
            hero_image_title: homeSettings[homeSettingsKey.HERO_IMAGE_TITLE] ? homeSettings[homeSettingsKey.HERO_IMAGE_TITLE].value : null,
            hero_image_description: homeSettings[homeSettingsKey.HERO_IMAGE_DESCRIPTION] ? homeSettings[homeSettingsKey.HERO_IMAGE_DESCRIPTION].value : null,
            about_us_text: homeSettings[homeSettingsKey.ABOUT_US_TEXT] ? homeSettings[homeSettingsKey.ABOUT_US_TEXT].value : null,
            genres_text: homeSettings[homeSettingsKey.GENRES_TEXT] ? homeSettings[homeSettingsKey.GENRES_TEXT].value : null,
            popular_books_text: homeSettings[homeSettingsKey.POPULAR_BOOKS_TEXT] ? homeSettings[homeSettingsKey.POPULAR_BOOKS_TEXT].value : null,
        },
        onSaveHomeSettings
    };

    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle title="Home Settings"/>
            <Row>
                <Col xs={12} className="mb-2">
                    <h5 className="page-heading">{getFormattedMessage('home-settings.title')}</h5>
                </Col>
                <Col sm={12}>
                    <Tabs defaultActiveKey="home-setting" id="uncontrolled-tab-example">
                        <Tab eventKey="home-setting" title={getFormattedMessage('settings.title')}>
                            <div className="sticky-table-container">
                                <Card>
                                    <CardBody>
                                        <HomeSettingsForm {...prepareFormOption}/>
                                    </CardBody>
                                </Card>
                            </div>
                        </Tab>
                        <Tab eventKey="card" title={getFormattedMessage('about-us-card.title')}>
                            <div className="sticky-table-container">
                                <Card className="p-0">
                                    <CardBody>
                                        <Cards />
                                    </CardBody>
                                </Card>
                            </div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
};

HomeSettings.propTypes = {
    homeSettings: PropTypes.object,
    fetchHomeSettings: PropTypes.func,
    postHomeSettings: PropTypes.func,
};

const mapStateToProps = (state) => {
    const {homeSettings} = state;
    const settingsArray = Object.values(homeSettings);
    const settingsArr = _.mapKeys(settingsArray, 'key');
    return {
        homeSettings: settingsArr
    }
};

export default connect(mapStateToProps, {
    fetchHomeSettings,
    postHomeSettings
})(HomeSettings);
