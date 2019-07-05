import React, { useContext, FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import ShowPasswordIcon from "@material-ui/icons/Visibility";
import HidePasswordIcon from "@material-ui/icons/VisibilityOff";
import { updateField, store } from "../../state";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface ShowHidePasswordButtonProps {
  readonly form: string;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles(theme => ({
  icon: {
    color: `${theme.palette.text.secondary} !important`
  }
}));

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const ShowHidePasswordButton: FunctionComponent<
  ShowHidePasswordButtonProps
> = ({ form }) => {
  const classes = useStyles({});
  const { state, dispatch } = useContext(store);
  const { showPassword } = state.forms[form].fields.password;

  const toggleShowPassword: IconButtonProps["onClick"] = event => {
    event.preventDefault();
    dispatch(updateField(form, "password", "showPassword", !showPassword));
  };

  return (
    <IconButton id="toggleShowPasswordButton" onClick={toggleShowPassword}>
      {showPassword ? (
        <HidePasswordIcon
          aria-label="Hide password input on screen"
          className={classes.icon}
          titleAccess="Hide password input on screen"
        />
      ) : (
        <ShowPasswordIcon
          aria-label="Display password as text on screen"
          className={classes.icon}
          titleAccess="Display password as text on screen"
        />
      )}
    </IconButton>
  );
};
export default ShowHidePasswordButton;
