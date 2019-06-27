import { DefaultState } from "./default";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Form fields
export interface FormFieldStandard {
  isInvalid: boolean;
  isValid: boolean;
  labelWidth: number;
  value: string;
}
export interface FormFieldPassword extends FormFieldStandard {
  showPassword: boolean;
}
type FormField = FormFieldStandard | FormFieldPassword;

// State
export interface State {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  readonly forms: {
    [key: string]: {
      fields: {
        [key: string]: FormField;
      };
      isOpen?: boolean;
    };
  };
  readonly progress: {
    [key: string]: {
      error: {
        message: string;
        description: string;
      };
      status: "waiting" | "loading" | "success" | "error";
    };
  };
}

export interface AllState extends DefaultState, State {}
