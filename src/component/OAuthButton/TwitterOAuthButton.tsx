import React, { FunctionComponent } from "react";
import { makeStyles, darken } from "@material-ui/core/styles";
import clsx from "clsx";
import OAuthButton, { OAuthButtonProps } from ".";
import TwitterIcon from "../../icon/TwitterFilled";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

type TwitterOAuthButtonProps = Omit<OAuthButtonProps, "icon">;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles({
  button: {
    backgroundColor: "#1da1f2",
    color: "#fff",
    "&:hover": {
      backgroundColor: darken("#1da1f2", 0.25)
    }
  }
});

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const TwitterOAuthButton: FunctionComponent<TwitterOAuthButtonProps> = ({
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
      icon={TwitterIcon}
      onClick={onClick}
    >
      {children}
    </OAuthButton>
  );
};
export default TwitterOAuthButton;
