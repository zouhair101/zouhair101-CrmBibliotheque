import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import {publicImagePath, publicImagePathURL} from "../../appConstant";
import {settingsKey} from "../../admin/constants";

const ReactHelmet = (props) => {
    const { title, settings } = props;
    const appName = settings[settingsKey.LIBRARY_NAME] ? settings[settingsKey.LIBRARY_NAME].value : null;
    const appLogo = settings[settingsKey.LIBRARY_FAVICON] ? settings[settingsKey.LIBRARY_FAVICON].logo_url : publicImagePath.APP_FAVICON;

    return (
        <Helmet onChangeClientState={() => {
            try {
                const existingIcons = document.querySelectorAll(
                    `link[rel="icon"],link[rel="apple-touch-icon"], link[rel="shortcut icon"]`
                );
                existingIcons.forEach(e => e.parentNode.removeChild(e));
                const link = document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.sizes = '16*16';
                link.href = appLogo;
                document.getElementsByTagName('head')[0].appendChild(link);
            } catch (e) {
            }
        }}>
            <title>{`${title} | ${appName}`}</title>
        </Helmet>
    );
};

ReactHelmet.propTypes = {
    settings: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    title: PropTypes.string,
};

const mapStateToProps = (state) => {
    return { settings: state.appSetting };
};

export default connect(mapStateToProps)(ReactHelmet);
