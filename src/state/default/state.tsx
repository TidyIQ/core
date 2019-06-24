import { State } from "..";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Forms
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface FormFieldStandard {
  isInvalid: boolean;
  isValid: boolean;
  labelWidth: number;
  value: string;
}

export interface FormFieldPassword extends FormFieldStandard {
  showPassword: boolean;
}

export type FormField = FormFieldStandard | FormFieldPassword;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Default state
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface DefaultState extends State {
  readonly forms?: {
    [key: string]: {
      fields: {
        [key: string]: FormField;
      };
      isOpen?: boolean;
    };
  };
  readonly progress?: {
    [key: string]: {
      error: {
        message: string;
        description: string;
      };
      status: "waiting" | "loading" | "success" | "error";
    };
  };
  readonly snackbar?: {
    open: boolean;
    message: string;
    undo: null | (() => void);
    variant: "success" | "warning" | "error" | "info";
  };
}

export const defaultState: DefaultState = {
  snackbar: {
    message: "",
    open: false,
    undo: null,
    variant: "info"
  }
};
