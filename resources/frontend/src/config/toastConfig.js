import {toast, cssTransition, Slide, Zoom, Flip, Bounce} from "react-toastify";

let id = 0;

const defaultOptions = {
    config: {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_RIGHT,
        closeButton: false,
        transition: Zoom
    }
};

export default (options = {}) => {
    return { ...defaultOptions, ...options, id: id++ }
};
