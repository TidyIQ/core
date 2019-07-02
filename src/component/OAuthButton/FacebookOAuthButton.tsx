import React, { FunctionComponent } from "react";
import { makeStyles, darken } from "@material-ui/core/styles";
import clsx from "clsx";
import OAuthButton, { OAuthButtonProps } from ".";
import FacebookIcon from "../../icon/FacebookFilled";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles({
  button: {
    backgroundColor: "#3b5998",
    color: "#fff",
    "&:hover": {
      backgroundColor: darken("#3b5998", 0.25)
    }
  }
});

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const FacebookOAuthButton: FunctionComponent<OAuthButtonProps> = ({
  children,
  onClick,
  buttonProps
}) => {
  const classes = useStyles({});
  return (
    <OAuthButton
      buttonProps={{
        ...buttonProps,
        className: clsx(buttonProps && buttonProps.className, classes.button)
      }}
      icon={FacebookIcon}
      onClick={onClick}
    >
      {children}
    </OAuthButton>
  );
};
export default FacebookOAuthButton;
