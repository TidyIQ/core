import { AllState } from "../state";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form field values
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const UPDATE_FIELD = "UPDATE_FIELD";

interface UpdateField {
  <
    S extends keyof AllState["forms"] = keyof AllState["forms"],
    F extends keyof AllState["forms"][S]["fields"] = keyof AllState["forms"][S]["fields"],
    K extends keyof AllState["forms"][S]["fields"][F] = keyof AllState["forms"][S]["fields"][F]
  >(
    form: S,
    field: F,
    key: K,
    value: AllState["forms"][S]["fields"][F][K]
  ): UpdateFieldReturn<S, F, K>;
}

export interface UpdateFieldReturn<
  S extends keyof AllState["forms"] = keyof AllState["forms"],
  F extends keyof AllState["forms"][S]["fields"] = keyof AllState["forms"][S]["fields"],
  K extends keyof AllState["forms"][S]["fields"][F] = keyof AllState["forms"][S]["fields"][F]
> {
  type: string;
  payload: {
    form: S;
    field: F;
    key: K;
    value: AllState[S]["fields"][F][K];
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

interface UpdateForm {
  <
    S extends keyof AllState["forms"] = keyof AllState["forms"],
    K extends keyof AllState["forms"][S] = keyof AllState["forms"][S]
  >(
    form: S,
    key: K,
    value: AllState["forms"][S][K]
  ): UpdateFormReturn<S, K>;
}

export interface UpdateFormReturn<
  S extends keyof AllState["forms"] = keyof AllState["forms"],
  K extends keyof AllState["forms"][S] = keyof AllState["forms"][S]
> {
  type: string;
  payload: {
    form: S;
    key: K;
    value: AllState["forms"][S][K];
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

interface SetProgressError<
  F extends keyof AllState["progress"] = keyof AllState["progress"]
> {
  (
    progress: F,
    message: AllState["progress"][F]["error"]["message"],
    description: AllState["progress"][F]["error"]["description"]
  ): SetProgressErrorReturn;
}

export interface SetProgressErrorReturn<
  F extends keyof AllState["progress"] = keyof AllState["progress"]
> {
  type: string;
  payload: {
    progress: F;
    message: AllState["progress"][F]["error"]["message"];
    description: AllState["progress"][F]["error"]["description"];
    status: AllState["progress"][F]["status"];
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

interface SnackbarClose {
  (): SnackbarCloseReturn;
}

export interface SnackbarCloseReturn {
  type: string;
  payload: {
    open: AllState["snackbar"]["open"];
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

interface SnackbarOpen {
  (
    variant: AllState["snackbar"]["variant"],
    message: AllState["snackbar"]["message"],
    undo: AllState["snackbar"]["undo"]
  ): SnackbarOpenReturn;
}

export interface SnackbarOpenReturn {
  type: string;
  payload: AllState["snackbar"];
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
