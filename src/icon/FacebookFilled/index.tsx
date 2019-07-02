import React, { FunctionComponent } from "react";
import SVGIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const FacebookFilled: FunctionComponent<SvgIconProps> = props => {
  return (
    <SVGIcon viewBox="0 0 50 50" {...props}>
      <path d="M32,11h5c0.552,0,1-0.448,1-1V3.263c0-0.524-0.403-0.96-0.925-0.997C35.484,2.153,32.376,2,30.141,2C24,2,20,5.68,20,12.368 V19h-7c-0.552,0-1,0.448-1,1v7c0,0.552,0.448,1,1,1h7v19c0,0.552,0.448,1,1,1h7c0.552,0,1-0.448,1-1V28h7.222 c0.51,0,0.938-0.383,0.994-0.89l0.778-7C38.06,19.518,37.596,19,37,19h-8v-5C29,12.343,30.343,11,32,11z" />
    </SVGIcon>
  );
};

export default FacebookFilled;
