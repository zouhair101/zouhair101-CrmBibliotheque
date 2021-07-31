import React, {useState} from "react";
import ReactCrop from "react-image-crop";
import PropTypes from 'prop-types';
import Modal from './Modal';
import ConfirmAction from '../action-buttons/ConfirmAction';
import './Component.scss';
import {getFormattedMessage} from "../sharedMethod";

let imageRef = null;
const ImageCropper = (props) => {
    const { image, emitFileChange, onSave, onCancel, isToggle, isFavicon = false } = props;
    const [crop, setCrop] = useState({
        aspect: 16 / 9,
        unit: 'px',
        width: 50,
        height: 50
    });
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const faviocnExtraOptions = {
        minHeight: 50,
        maxHeight: 50,
        minWidth: 50,
        maxWidth: 50,
    };
    const onImageLoaded = image => {
        imageRef = image;
    };

    const onCropComplete = crop => {
        makeClientCrop(crop).then(croppedImageUrl => {
            setCroppedImageUrl(croppedImageUrl);
        });
    };

    const onCropChange = (crop, percentCrop) => {
        setCrop(crop);
    };

    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            return await getCroppedImg(
                imageRef,
                crop,
                "newFile.jpeg"
            );
        }
    };

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    // reject(new Error('Canvas is empty'));
                    return;
                }
                blob.name = fileName;
                blob.lastModifiedDate = new Date();
                emitFileChange(blob, croppedImageUrl);
                resolve(window.URL.createObjectURL(blob));
            }, "image/jpeg");
        });
    };

    let prepareCropOption = {
        src: image, crop, onImageLoaded,
        onComplete: onCropComplete,
        onChange: onCropChange,
    };

    if (isFavicon) {
        prepareCropOption = { ...prepareCropOption, ...faviocnExtraOptions }
    }

    const prepareModalOption = {
        className: 'membership-plan-modal',
        title: getFormattedMessage('image-cropper.modal.title'),
        content: <>
            <ReactCrop {...prepareCropOption}/>
            {croppedImageUrl &&
            (<div className="mt-2">
                    <h5>Preview</h5>
                    <hr/>
                    <div className="text-center">
                        <img alt="Crop" className="react-img-cropper__img" src={croppedImageUrl}/>
                    </div>
                </div>
            )}
        </>,
        actions: <ConfirmAction onConfirm={onSave} onCancel={onCancel}/>,
    };

    return (
        image && isToggle ? (<Modal {...prepareModalOption}/>) : null
    );
};

ImageCropper.propTypes = {
    image: PropTypes.string,
    isToggle: PropTypes.bool,
    isFavicon: PropTypes.bool,
    emitFileChange: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
};

export default ImageCropper;
