import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Tooltip} from 'reactstrap';

const TooltipItem = (props) => {
    const { tooltip, target, placement = 'top' } = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => {
        setTooltipOpen(!tooltipOpen)
    };

    return (
        <Tooltip placement={placement} isOpen={tooltipOpen} target={target} toggle={toggle}>
            {tooltip}
        </Tooltip>
    );
};

TooltipItem.propTypes = {
    target: PropTypes.element,
    tooltip: PropTypes.string,
    placement: PropTypes.string
};

export default TooltipItem;
