import React, {
  useContext,
  useRef,
  useEffect,
  ComponentType,
  FunctionComponent
} from "react";
import { makeStyles } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import OutlinedInput, {
  OutlinedInputProps
} from "@material-ui/core/OutlinedInput";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";
import FormHelperText, {
  FormHelperTextProps
} from "@material-ui/core/FormHelperText";
import Collapse from "@material-ui/core/Collapse";
import ShowHidePasswordButton from "../ShowHidePasswordButton";
import IconStartAdornment from "../IconStartAdornment";
import { updateField, store } from "../../state";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Logic
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface UseUpdateValidity {
  (
    form: string,
    id: string,
    isValid: boolean,
    isInvalid: boolean,
    passesValidCheck: boolean
  ): void;
}

const useUpdateValidity: UseUpdateValidity = (
  form,
  id,
  isValid,
  isInvalid,
  passesValidCheck
) => {
  const { dispatch } = useContext(store);
  if (passesValidCheck) {
    if (!isValid) {
      dispatch(updateField(form, id, "isValid", true));
    }
    if (isInvalid) {
      dispatch(updateField(form, id, "isInvalid", false));
    }
  } else {
    if (isValid) {
      dispatch(updateField(form, id, "isValid", false));
    }
    if (!isInvalid) {
      dispatch(updateField(form, id, "isInvalid", true));
    }
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface InputField {
  readonly form: string;
  readonly icon: ComponentType<SvgIconProps>;
  readonly id: HTMLInputElement["id"];
  readonly label: HTMLLabelElement["innerText"];
  readonly type?: HTMLInputElement["type"];
  readonly validation: {
    readonly helperMessage?: string;
    readonly invalidMessage?: string;
    readonly minLength?: HTMLInputElement["minLength"];
    readonly pattern: HTMLInputElement["pattern"];
    readonly required: HTMLInputElement["required"];
  };
}

interface MyOutlinedInputProps {
  readonly fieldData: InputField;
  readonly formControlProps?: FormControlProps;
  readonly showIcon?: boolean;
  readonly validate: "blur" | "inline" | "none";
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// CSS
// ::::::::::::::::::::::::::::::::::::::::::::::::

const useStyles = makeStyles(theme => ({
  errorColor: {
    color: theme.palette.error.main
  },
  errorMessage: {},
  focused: {},
  inputLabel: {
    marginLeft: theme.spacing(5.5)
  },
  labelValid: {
    color: theme.custom.palette.success,
    "&$focused": {
      color: theme.custom.palette.success
    }
  },
  notchedOutline: {},
  notchedValid: {
    "& $notchedOutline": {
      borderColor: theme.custom.palette.success
    },
    "&:hover $notchedOutline": {
      borderColor: theme.custom.palette.success
    },
    "&$focused $notchedOutline": {
      borderColor: theme.custom.palette.success
    }
  },
  validColor: {
    color: `${theme.custom.palette.success} !important`
  }
}));

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Component
// ::::::::::::::::::::::::::::::::::::::::::::::::

const MyOutlinedInput: FunctionComponent<MyOutlinedInputProps> = ({
  fieldData,
  formControlProps,
  showIcon,
  validate
}) => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles({});

  const { form, icon, id, label, type, validation } = fieldData;
  const {
    helperMessage,
    invalidMessage,
    minLength,
    pattern,
    required
  } = validation;

  const { isValid, isInvalid, labelWidth, showPassword, value } = state.forms[
    form
  ].fields[id];

  const isPassword = type === "password";
  const isEmpty = value.length === 0;

  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const currentInputRef = inputRef.current;
  const currentLabelRef = labelRef.current;
  const { validationMessage } = currentInputRef || {
    validationMessage: "Error"
  };
  const labelOffsetWidth = currentLabelRef ? currentLabelRef.offsetWidth : 0;

  let helperText: FormHelperTextProps["children"];
  let iconStartAdornClasses: SvgIconProps["classes"];
  let inputLabelClasses: InputLabelProps["classes"];
  let inputType = type || "text";

  if (isPassword && showPassword) {
    inputType = "text";
  }

  if (isValid) {
    iconStartAdornClasses = { root: classes.validColor };
    inputLabelClasses = { root: classes.labelValid, focused: classes.focused };
  }

  if (isInvalid) {
    iconStartAdornClasses = { root: classes.errorColor };
    helperText = invalidMessage || validationMessage;
  } else {
    helperText = helperMessage;
  }

  const handleChange: OutlinedInputProps["onChange"] = event => {
    dispatch(updateField(form, id, "value", event.target.value.trimLeft()));
    if (validate === "inline" || (validate === "blur" && isInvalid)) {
      const passesValidCheck = event.target.checkValidity();
      useUpdateValidity(form, id, isValid, isInvalid, passesValidCheck);
    }
  };

  const handleBlur: (
    event: React.FocusEvent<HTMLInputElement>
  ) => void = event => {
    const newFocus = event.relatedTarget as HTMLElement;

    if (newFocus.id === "toggleShowPasswordButton") {
      window.setTimeout(() => {
        if (currentInputRef) {
          currentInputRef.focus();
        }
      }, 0);
    }

    if (!isEmpty) {
      switch (validate) {
        case "blur": {
          const passesValidCheck = event.target.checkValidity();
          useUpdateValidity(form, id, isValid, isInvalid, passesValidCheck);
          break;
        }
        case "inline":
          break;
        default:
      }
    }
  };

  // Set labelWidth on component mount
  useEffect((): void => {
    dispatch(updateField(form, id, "labelWidth", labelOffsetWidth));
  }, []);

  return (
    <FormControl
      error={isInvalid}
      fullWidth
      margin="dense"
      variant="outlined"
      {...formControlProps}
    >
      <InputLabel
        classes={inputLabelClasses}
        className={showIcon ? classes.inputLabel : undefined}
        htmlFor={id}
        ref={labelRef}
        shrink={!isEmpty}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        classes={{
          focused: classes.focused,
          notchedOutline: classes.notchedOutline,
          root: !isEmpty && isValid ? classes.notchedValid : undefined
        }}
        endAdornment={
          isPassword ? <ShowHidePasswordButton form={form} /> : undefined
        }
        id={id}
        inputProps={{ minLength, pattern, required }}
        inputRef={inputRef}
        labelWidth={labelWidth}
        notched={!isEmpty}
        onBlur={handleBlur}
        onChange={handleChange}
        startAdornment={
          showIcon ? (
            <IconStartAdornment
              icon={icon}
              props={{
                classes: iconStartAdornClasses
              }}
            />
          ) : (
            undefined
          )
        }
        type={inputType}
        value={value}
      />
      <Collapse in={isInvalid || validation.helperMessage !== undefined}>
        <FormHelperText error={isInvalid} variant="outlined">
          {helperText}
        </FormHelperText>
      </Collapse>
    </FormControl>
  );
};

export default MyOutlinedInput;
