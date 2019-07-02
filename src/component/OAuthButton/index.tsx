import React, { FunctionComponent } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import ContinueIcon from "@material-ui/icons/ChevronRight";
import ButtonWithIcon, { ButtonWithIconProps } from "../ButtonWithIcon";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export type OAuthButtonProps = ButtonWithIconProps;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles(() => ({
  buttonRoot: {
    justifyContent: "flex-start"
  },
  continueIcon: {
    marginLeft: "auto"
  }
}));

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const OAuthButton: FunctionComponent<OAuthButtonProps> = ({
  buttonProps,
  children,
  icon,
  iconProps,
  onClick
}) => {
  const match = useMediaQuery("(min-width:329px)");
  const classes = useStyles({});
  return (
    <ButtonWithIcon
      buttonProps={{
        classes: { root: classes.buttonRoot },
        fullWidth: true,
        size: "large",
        variant: "contained",
        ...buttonProps
      }}
      icon={icon}
      iconProps={{ fontSize: "small", ...iconProps }}
      onClick={onClick}
    >
      {children}
      {match && <ContinueIcon className={classes.continueIcon} />}
    </ButtonWithIcon>
  );
};

export default OAuthButton;
