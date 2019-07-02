import React, { ComponentType, FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Divider from "@material-ui/core/Divider";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface IconStartAdornmentProps {
  readonly icon: ComponentType<SvgIconProps>;
  readonly props?: SvgIconProps;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: "center",
    display: "inline-flex"
  },
  divider: {
    height: 28,
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    width: 1
  }
}));

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const IconStartAdornment: FunctionComponent<IconStartAdornmentProps> = ({
  icon,
  props
}) => {
  const classes = useStyles({});
  const IconComponent = icon;
  return (
    <div className={classes.root}>
      <IconComponent {...props} />
      <Divider className={classes.divider} />
    </div>
  );
};

export default IconStartAdornment;
