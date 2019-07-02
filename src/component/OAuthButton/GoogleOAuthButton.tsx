import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import OAuthButton, { OAuthButtonProps } from ".";
import GoogleIcon from "../../icon/GoogleFilled";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

type GoogleOAuthButtonProps = Omit<OAuthButtonProps, "icon">;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles({
  button: {
    backgroundColor: "#fff"
  }
});

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const GoogleOAuthButton: FunctionComponent<GoogleOAuthButtonProps> = ({
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
      icon={GoogleIcon}
      onClick={onClick}
    >
      {children}
    </OAuthButton>
  );
};
export default GoogleOAuthButton;
