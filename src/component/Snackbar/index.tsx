import React, { useContext, FunctionComponent, ComponentType } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Snackbar, { SnackbarProps } from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button, { ButtonProps } from "@material-ui/core/Button";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { closeSnackbar, store, State } from "../../state";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface UseVariant {
  (variant: State["snackbar"]["variant"]): {
    color: string;
    Icon: ComponentType<SvgIconProps>;
  };
}

interface StylesProps {
  color: string;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Logic
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useVariant: UseVariant = variant => {
  const theme = useTheme();
  const snackbarVariants = {
    error: {
      color: theme.palette.error.dark,
      Icon: ErrorIcon
    },
    info: {
      color: theme.custom.palette.info,
      Icon: InfoIcon
    },
    success: {
      color: theme.custom.palette.success,
      Icon: SuccessIcon
    },
    warning: {
      color: theme.custom.palette.warn,
      Icon: WarningIcon
    }
  };
  return snackbarVariants[variant];
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles(theme => ({
  closeBtn: {
    padding: theme.spacing(0.5)
  },
  closeIcon: {
    fontSize: 20
  },
  iconVariant: {
    marginRight: theme.spacing(1),
    opacity: 0.9
  },
  message: {
    alignItems: "center",
    display: "flex"
  },
  snackbarContent: (props: StylesProps) => ({
    backgroundColor: props.color,
    color: theme.palette.getContrastText(props.color)
  }),
  undoBtn: {
    marginTop: "0"
  }
}));

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const MySnackbar: FunctionComponent = () => {
  const { state, dispatch } = useContext(store);
  const { message, open, undo, variant } = state.snackbar;
  const { color, Icon } = useVariant(variant);
  const classes = useStyles({ color });
  const hasUndo = undo !== null;

  const handleCloseClick: IconButtonProps["onClick"] = () => {
    dispatch(closeSnackbar());
  };

  const handleCloseSynthetic: SnackbarProps["onClose"] = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  const handleUndo: ButtonProps["onClick"] = () => {
    dispatch(closeSnackbar());
    if (undo !== null) {
      undo();
    }
  };

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom"
      }}
      autoHideDuration={5000}
      onClose={handleCloseSynthetic}
      open={open}
    >
      <SnackbarContent
        aria-describedby="snackbar-message"
        className={classes.snackbarContent}
        message={
          <span className={classes.message} id="snackbar-message">
            <Icon className={classes.iconVariant} />
            {message}
          </span>
        }
        action={[
          hasUndo ? (
            <Button
              aria-label="Undo last action"
              className={classes.undoBtn}
              color="inherit"
              key="undo"
              onClick={handleUndo}
              size="small"
            >
              UNDO
            </Button>
          ) : (
            ""
          ),
          <IconButton
            aria-label="Close message"
            color="inherit"
            className={classes.closeBtn}
            key="close"
            onClick={handleCloseClick}
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};
export default MySnackbar;
