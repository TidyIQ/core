import { State } from "../state";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form field values
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const UPDATE_FIELD = "UPDATE_FIELD";

export interface UpdateField {
  <
    S extends keyof State["forms"] = keyof State["forms"],
    F extends keyof State["forms"][S]["fields"] = keyof State["forms"][S]["fields"],
    K extends keyof State["forms"][S]["fields"][F] = keyof State["forms"][S]["fields"][F]
  >(
    form: S,
    field: F,
    key: K,
    value: State["forms"][S]["fields"][F][K]
  ): {
    type: string;
    payload: {
      form: S;
      field: F;
      key: K;
      value: State[S]["fields"][F][K];
    };
  };
}

export const updateField: UpdateField = (form, field, key, value) => {
  return {
    type: UPDATE_FIELD,
    payload: {
      form,
      field,
      key,
      value
    }
  };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update state values
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const UPDATE_FORM = "UPDATE_FORM";

export interface UpdateForm {
  <
    S extends keyof State["forms"] = keyof State["forms"],
    K extends keyof State["forms"][S] = keyof State["forms"][S]
  >(
    form: S,
    key: K,
    value: State["forms"][S][K]
  ): {
    type: string;
    payload: {
      form: S;
      key: K;
      value: State["forms"][S][K];
    };
  };
}

export const updateForm: UpdateForm = (form, key, value) => {
  return {
    type: UPDATE_FORM,
    payload: {
      form,
      key,
      value
    }
  };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Change form status to error and set error message and description
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const SET_PROGRESS_ERROR = "SET_FORM_PROGRESS_ERROR";

export interface SetProgressError<
  F extends keyof State["progress"] = keyof State["progress"]
> {
  (
    progress: F,
    message: State["progress"][F]["error"]["message"],
    description: State["progress"][F]["error"]["description"]
  ): {
    type: string;
    payload: {
      progress: F;
      message: State["progress"][F]["error"]["message"];
      description: State["progress"][F]["error"]["description"];
      status: State["progress"][F]["status"];
    };
  };
}

export const setProgressError: SetProgressError = (
  progress,
  message,
  description
) => {
  return {
    type: SET_PROGRESS_ERROR,
    payload: {
      progress,
      message,
      description,
      status: "error"
    }
  };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Close snackbar
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const SNACKBAR_CLOSE = "SNACKBAR_CLOSE";

export interface SnackbarClose {
  (): {
    type: string;
    payload: {
      open: State["snackbar"]["open"];
    };
  };
}

export const closeSnackbar: SnackbarClose = () => {
  return {
    type: SNACKBAR_CLOSE,
    payload: {
      open: false
    }
  };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Open snackbar
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const SNACKBAR_OPEN = "SNACKBAR_OPEN";

export interface SnackbarOpen {
  (
    variant: State["snackbar"]["variant"],
    message: State["snackbar"]["message"],
    undo: State["snackbar"]["undo"]
  ): {
    type: string;
    payload: State["snackbar"];
  };
}

export const openSnackbar: SnackbarOpen = (variant, message, undo) => {
  return {
    type: SNACKBAR_OPEN,
    payload: {
      variant,
      message,
      open: true,
      undo
    }
  };
};
