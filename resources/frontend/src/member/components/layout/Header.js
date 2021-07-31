import React, {useState} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import PropTypes from 'prop-types';
import {Routes} from "../../../constants";
import {getAvatarName, getFormattedMessage} from "../../../shared/sharedMethod";
import ChangePassword from "../change-password/ChangePassword.js";
import ChangeLanguage from "../change-language/ChangeLanguage";
import {connect} from "react-redux";
import {toggleChangePasswordModal} from "../../../store/action/changePasswordModalAction";
import {toggleChangeLanguageModal} from "../../../store/action/changeLanguageModalAction";

const MemberHeader = (props) => {
    const { member, history, appName, appLogo, toggleChangePasswordModal, toggleChangeLanguageModal } = props;
    const cardModalProps = { toggleChangePasswordModal };
    const languageModalProps = {toggleChangeLanguageModal}
    const [toggleOpen, setToggle] = useState(true);
    let imageUrl = null;

    if (member) {
        member.name = member.first_name;
        if (member.last_name) {
            member.name += ' ' + member.last_name;
        }
        if (member.image_path) {
            imageUrl = member.image_path;
        }
    }

    const goToMemberProfile = () => {
        history.push(Routes.MEMBER_PROFILE);
    };

    const toggle = () => {
        setToggle(true);
        toggleChangePasswordModal();
    };

    const languageToggle = () => {
        setToggle(false);
        toggleChangeLanguageModal();
    }

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
                                {getAvatarName(member ? member.name : null)}
                                </span>
                            </div>
                        }
                        <span className="mr-3 header__user-name">{member ? member.name : null}</span>
                    </DropdownToggle>
                    <DropdownMenu right className="header__user-name">
                        <DropdownItem onClick={goToMemberProfile}><i className="fa fa-cog"/>
                            {getFormattedMessage('profile.title')}
                        </DropdownItem>
                        <DropdownItem onClick={toggle}><i className="fa fa-lock"/>
                            {getFormattedMessage('change-password.title')}
                        </DropdownItem>
                        <DropdownItem onClick={languageToggle}><i className="fa fa-language"/>
                            {getFormattedMessage('change-language.title')}
                        </DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"/>
                            {getFormattedMessage('header.logout.title')}
                        </DropdownItem>
                    </DropdownMenu>
                    {toggleOpen ?
                        <ChangePassword {...cardModalProps}/> :
                        <ChangeLanguage {...languageModalProps}/>
                        }
                </AppHeaderDropdown>
            </Nav>
        </>
    );
};

MemberHeader.propTypes = {
    member: PropTypes.object,
    history: PropTypes.object,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
};

export default connect(null, { toggleChangePasswordModal , toggleChangeLanguageModal })(MemberHeader);
