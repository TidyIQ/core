// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface State {
  readonly [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  readonly forms: {
    [key: string]: {
      fields: {
        [key: string]: {
          isInvalid: boolean;
          isValid: boolean;
          labelWidth: number;
          showPassword?: boolean;
          value: string;
        };
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
  readonly snackbar: {
    message: string;
    open: boolean;
    undo: null | (() => void);
    variant: "success" | "warning" | "error" | "info";
  };
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Default initial state
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const defaultState: State = {
  forms: {},
  progress: {},
  snackbar: {
    message: "",
    open: false,
    undo: null,
    variant: "info"
  }
};
