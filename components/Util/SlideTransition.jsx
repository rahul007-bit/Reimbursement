import { Slide } from "@mui/material";
import React from "react";

const SliderTransition = React.forwardRef(function SliderTransition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default SliderTransition;
