import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import PropTypes from 'prop-types';
import {Routes} from "../../../constants";
import {getAvatarName, getFormattedMessage} from "../../../shared/sharedMethod";
import ChangePassword from "../change-password/ChangePassword";
import {connect} from "react-redux";
import {toggleChangePasswordModal} from "../../../store/action/changePasswordModalAction";

const Header = (props) => {
    const { user, history, appName, appLogo, toggleChangePasswordModal } = props;
    const cardModalProps = { toggleChangePasswordModal };

    let imageUrl = null;
    if (user) {
        user.name = user.first_name;
        if (user.last_name) {
            user.name += ' ' + user.last_name;
        }
        if (user.image_path) {
            imageUrl = user.image_path;
        }
    }

    const goToUserProfile = () => {
        history.push(Routes.USER_PROFILE);
    };

    const toggle = () => {
        toggleChangePasswordModal()
    };

    return (
        <>
            <AppSidebarToggler className="d-lg-none" display="md" mobile/>
            <AppNavbarBrand>
                <img className="header__app-logo" src={appLogo} alt={appLogo}/>
                <span className="ml-2 header__app-name">{appName}</span>
            </AppNavbarBrand>
            <Nav className="ml-auto" navbar>
                <AppHeaderDropdown direction="down">
                    <DropdownToggle nav>
                        {imageUrl ? <img src={imageUrl} className="img-avatar" alt="user-avatar"/> :
                            <div className="header__avatar img-avatar">
                                <span className="header__avatar-text">
                                    {getAvatarName(user ? user.name : null)}
                                </span>
                            </div>
                        }
                        <span className="mr-3 header__user-name">{user ? user.name : null}</span>
                    </DropdownToggle>
                    <DropdownMenu right className="header__user-name">
                        <DropdownItem onClick={goToUserProfile}><i className="fa fa-cog"/>
                            {getFormattedMessage('profile.title')}
                        </DropdownItem>
                        <DropdownItem onClick={toggle}><i className="fa fa-lock"/>
                            {getFormattedMessage('change-password.title')}
                        </DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-sign-out"/>
                            {getFormattedMessage('header.logout.title')}
                        </DropdownItem>
                    </DropdownMenu>
                    <ChangePassword {...cardModalProps}/>
                </AppHeaderDropdown>
            </Nav>
        </>
    );
};

Header.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object,
    appName: PropTypes.string,
    appLogo: PropTypes.string
};

export default connect(null, { toggleChangePasswordModal })(Header);
