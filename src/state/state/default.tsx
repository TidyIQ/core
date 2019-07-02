// ::::::::::::::::::::::::::::::::::::::::::::::::
// Default initial state
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface DefaultState {
  readonly snackbar: {
    message: string;
    open: boolean;
    undo: null | (() => void);
    variant: "success" | "warning" | "error" | "info";
  };
}

const defaultState: DefaultState = {
  snackbar: {
    message: "",
    open: false,
    undo: null,
    variant: "info"
  }
};

export default defaultState;
