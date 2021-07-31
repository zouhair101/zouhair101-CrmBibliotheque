import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import './ImagePicker.scss';
import {getAvatarName, getFormattedMessage} from "../sharedMethod";

const ImagePicker = (props) => {
    const {
        image, isDefaultImage, onFileChange, onRemovePhoto, inputField = 'userInput',
        buttonName = "image-picker.dropdown.profile.label", isRemoveOption = true, user,
        isFavicon = false
    } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const openFileSelect = () => {
        document.getElementById(inputField).click();
    };

    const getConcatedMessage = (messageId) => {
        return (
            <>
                {getFormattedMessage(messageId)} &nbsp;
                {getFormattedMessage(buttonName)}
            </>
        )
    };

    const renderRemoveOption = () => {
        if (!isDefaultImage && isRemoveOption) {
            return (<DropdownItem className="text-center" onClick={() => onRemovePhoto()}>
                {getConcatedMessage("image-picker.dropdown.remove.label")}
            </DropdownItem>);
        }
    };
    const toggleClass = !isFavicon ? 'image__dropdown-btn' : 'image__favicon-dropdown-btn';
    const dropMenuClass = !isFavicon ? 'image__dropdown-menu' : 'image__favicon-dropdown-menu';
    const holderClass = !isFavicon ? 'image__holder' : 'image__favicon-holder';
    const previewClass = !isFavicon ? 'image__preview' : 'image__favicon-preview';
    const avatarClass = !isFavicon ? 'image__avatar' : 'image__favicon-avatar-text';
    const avatarTextClass = !isFavicon ? 'image__avatar-text' : 'image__favicon-avatar-text';
    const height = !isFavicon ? 200 : 120;
    const width = !isFavicon ? 200 : 120;

    const renderPopOver = () => {
        return (
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle className={toggleClass}>
                    {isDefaultImage ? getConcatedMessage('image-picker.dropdown.add.label') :
                        getConcatedMessage('image-picker.dropdown.change.label')}
                </DropdownToggle>
                <DropdownMenu className={dropMenuClass}>
                    <DropdownItem className="text-center" onClick={() => openFileSelect()}>
                        {isDefaultImage ? getConcatedMessage('image-picker.dropdown.add.label') :
                            getConcatedMessage('image-picker.dropdown.change.label')}
                    </DropdownItem>
                    {renderRemoveOption()}
                    <DropdownItem className="text-center">{getFormattedMessage("global.input.cancel-btn.label")}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    };

    return (
        <>
            <input id={inputField} type="file" onClick={(e) => e.target.value = null} className="d-none"
                   onChange={(e) => onFileChange(e)} accept="image/*"/>
            <div className={holderClass}>
                {image ?
                    <img src={image ? image : null} className={`${previewClass} mx-auto d-block`} height={height}
                         width={width} alt={image}/> :
                    <div className={avatarClass}>
                        <span className={avatarTextClass}>{getAvatarName(user ? user.name : null)}</span>
                    </div>
                }
                {renderPopOver()}
            </div>
        </>
    )
};

ImagePicker.propTypes = {
    user: PropTypes.object,
    image: PropTypes.string,
    inputField: PropTypes.string,
    buttonName: PropTypes.string,
    isDefaultImage: PropTypes.bool,
    isRemoveOption: PropTypes.bool,
    onFileChange: PropTypes.func,
    onRemovePhoto: PropTypes.func,
};

export default ImagePicker;
