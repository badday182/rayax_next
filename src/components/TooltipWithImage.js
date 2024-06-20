import React from "react";
// import ReactTooltip from "react-tooltip";
// import * as ReactTooltip from "react-tooltip";
import { Tooltip as ReactTooltip } from 'react-tooltip'

const TooltipWithImage = ({ id, text, imageSrc }) => (
  <>
    <span data-tip data-for={id}>
      {text}
    </span>
    <ReactTooltip id={id} effect="solid" place="bottom">
      <img src={imageSrc} alt={text} />
    </ReactTooltip>
  </>
);

export default TooltipWithImage;
