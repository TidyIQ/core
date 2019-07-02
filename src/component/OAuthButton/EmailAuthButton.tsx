import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import MailIcon from "@material-ui/icons/Mail";
import OAuthButton, { OAuthButtonProps } from ".";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

type EmailAuthButtonProps = Omit<OAuthButtonProps, "icon">;

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

const EmailAuthButton: FunctionComponent<EmailAuthButtonProps> = ({
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
      icon={MailIcon}
      onClick={onClick}
    >
      {children}
    </OAuthButton>
  );
};
export default EmailAuthButton;
