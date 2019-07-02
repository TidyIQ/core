import { DefaultState } from "./default";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Form fields
export interface FormField {
  isInvalid: boolean;
  isValid: boolean;
  labelWidth: number;
  showPassword?: boolean;
  value: string;
}

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
