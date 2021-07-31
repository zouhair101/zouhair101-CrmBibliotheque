import React from 'react';
import {Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './UserDetailsCard.scss';
import {getAvatarName, getFormattedMessage, prepareFullAddress} from "../../../../shared/sharedMethod";
import {publicImagePathURL} from "../../../../appConstant";

const UserDetailsCard = props => {
    const { user, isMember } = props;
    const imageUrl = user.image_path && !isMember ? user.image_path :
        user.image_path && isMember ? user.image_path : null;
    const fullAddress = prepareFullAddress(user.address);

    return (
        <Row className="user-details-card__row no-gutters">
            <div className="user-details-card__image-holder-wrapper">
                <div className="user-details-card__image-holder">
                    {imageUrl ? <img src={imageUrl} width="250"/> :
                        <div className="user-details-card__avatar">
                            <span className="user-details-card__avatar-text">
                                {getAvatarName(user.first_name + ' ' + user.last_name)}
                            </span>
                        </div>
                    }
                </div>
            </div>
            <div className="user-details-card">
                <div className="user-details-card__item-container">
                    <div className="user-details-card__item">
                        <span className="user-details-card__item-heading">
                            {getFormattedMessage('profile.input.email.label')}
                        </span>
                        <span>{user.email}</span>
                    </div>
                    {fullAddress !== '' ?
                        <div className="user-details-card__item">
                            <span className="user-details-card__item-heading">
                              {getFormattedMessage('profile.input.address.label')}
                            </span>
                            <span>{fullAddress}</span>
                        </div> : null
                    }
                    {user.phone ?
                        <div className="user-details-card__item">
                            <span className="user-details-card__item-heading">
                                {getFormattedMessage('profile.input.phone.label')}
                            </span>
                            <span>{user.phone}</span>
                        </div> : null
                    }
                    {user.roles ?
                        <div className="user-details-card__item">
                             <span className="user-details-card__item-heading">
                                 {getFormattedMessage('users.select.role.label')}
                             </span>
                            <span>{user.roles.map(({ name }) => name).join('')}</span>
                        </div> : null
                    }
                    {user.membership_plan ?
                        <div className="user-details-card__item">
                            <span className="user-details-card__item-heading">
                                {getFormattedMessage('members.select.plan.label')}
                            </span>
                            <span>{user.membership_plan.name}</span>
                        </div> : null
                    }
                    <div className="user-details-card__item">
                        <span className="user-details-card__item-heading">
                            {getFormattedMessage('react-data-table.status.column')}
                        </span>
                        <span>{user.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                </div>
            </div>
        </Row>
    )
};

UserDetailsCard.propTypes = {
    user: PropTypes.object,
    isMember: PropTypes.bool,
};

export default UserDetailsCard;
