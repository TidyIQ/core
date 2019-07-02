import React, { Fragment, FunctionComponent, ComponentType } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Report";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Collapse from "@material-ui/core/Collapse";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface ProgressProps {
  readonly error: {
    readonly description: string;
    readonly title: string;
  };
  readonly loading: {
    readonly icon: ComponentType<SvgIconProps>;
    readonly title: string;
  };
  readonly status: string;
  readonly success: {
    readonly description: string;
    readonly title?: string;
  };
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles(theme => ({
  description: {
    marginTop: theme.spacing(2)
  },
  error: {
    color: theme.palette.error.main
  },
  progress: {
    color: theme.custom.palette.success,
    position: "absolute",
    top: 1,
    left: 1
    // zIndex: 1
  },
  progressContainer: {
    margin: "0 auto",
    position: "relative",
    width: "fit-content"
  },
  progressIcon: {
    fontSize: theme.typography.pxToRem(70)
  },
  status: {
    marginTop: theme.spacing(1)
  },
  success: {
    color: theme.custom.palette.success
  }
}));

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const Progress: FunctionComponent<ProgressProps> = ({
  error,
  loading,
  status,
  success = { title: "Success!", description: "" }
}) => {
  const classes = useStyles({});
  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  // isLoading (default)
  let color: SvgIconProps["color"] = "primary";
  let description = "";
  let { icon, title } = loading;
  let iconClass: undefined | string;
  let titleClass: undefined | string;

  // isSuccess
  if (isSuccess) {
    color = undefined;
    icon = SuccessIcon;
    iconClass = classes.success;
    ({ description, title } = success);
    titleClass = classes.success;
  }

  // isError
  else if (isError) {
    color = "error";
    icon = ErrorIcon;
    ({ description, title } = error);
    titleClass = classes.error;
  }

  const IconComponent = icon;

  return (
    <Fragment>
      <div className={classes.progressContainer}>
        <IconComponent
          className={clsx(classes.progressIcon, iconClass)}
          color={color}
        />
        {isLoading && (
          <CircularProgress className={classes.progress} size={68} />
        )}
      </div>
      <Typography
        align="center"
        className={clsx(classes.status, titleClass)}
        color="inherit"
        component="p"
        variant="h6"
      >
        {title}
      </Typography>
      <Collapse in={isSuccess || isError}>
        <Typography align="center" className={classes.description}>
          {description}
        </Typography>
      </Collapse>
    </Fragment>
  );
};

export default Progress;
