import React, { ComponentType, FunctionComponent } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface ButtonWithIconProps {
  readonly icon: ComponentType<SvgIconProps>;
  readonly onClick: ButtonProps["onClick"];
  readonly buttonProps?: Omit<ButtonProps, "onClick">;
  readonly iconProps?: SvgIconProps;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  }
}));

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const ButtonWithIcon: FunctionComponent<ButtonWithIconProps> = ({
  icon,
  onClick,
  buttonProps,
  iconProps,
  children
}) => {
  const classes = useStyles({});
  const IconComponent = icon;
  return (
    <Button onClick={onClick} {...buttonProps}>
      <IconComponent
        {...iconProps}
        className={clsx(classes.icon, iconProps.className)}
      />
      {children}
    </Button>
  );
};

export default ButtonWithIcon;
