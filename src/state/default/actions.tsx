import { State, createAction } from "..";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Action types
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const UPDATE_FIELD = "UPDATE_FIELD";
export const UPDATE_FORM = "UPDATE_FORM";
export const SET_PROGRESS_ERROR = "SET_FORM_PROGRESS_ERROR";
export const SNACKBAR_OPEN = "SNACKBAR_OPEN";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form field values
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface UpdateField<
  K extends keyof State["forms"][S]["fields"][F],
  S extends keyof State["forms"] = keyof State["forms"],
  F extends keyof State["forms"][S]["fields"] = keyof State["forms"][S]["fields"]
> {
  (
    form: S,
    field: F,
    value: State["forms"][S]["fields"][F][K]
  ): UpdateFieldReturn<K, S, F>;
}

interface UpdateFieldReturn<
  K extends keyof State["forms"][S]["fields"][F],
  S extends keyof State["forms"] = keyof State["forms"],
  F extends keyof State["forms"][S]["fields"] = keyof State["forms"][S]["fields"]
> {
  type: typeof UPDATE_FIELD;
  payload: {
    form: S;
    field: F;
    key: K;
    value: State["forms"][S]["fields"][F][K];
  };
}

export const changeFieldInvalidState: UpdateField<"isInvalid"> = (
  form,
  field,
  value
) => {
  return {
    type: UPDATE_FIELD,
    payload: {
      form,
      field,
      key: "isInvalid",
      value
    }
  };
};

export const changeFieldValidState: UpdateField<"isValid"> = (
  form,
  field,
  value
) => {
  return {
    type: UPDATE_FIELD,
    payload: {
      form,
      field,
      key: "isValid",
      value
    }
  };
};

export const setFieldLabelWidth: UpdateField<"labelWidth"> = (
  form,
  field,
  value
) => {
  return {
    type: UPDATE_FIELD,
    payload: {
      form,
      field,
      key: "labelWidth",
      value
    }
  };
};

export const updateFieldValue: UpdateField<"value"> = (form, field, value) => {
  return {
    type: UPDATE_FIELD,
    payload: {
      form,
      field,
      key: "value",
      value
    }
  };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form values
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface UpdateForm<
  K extends keyof State["forms"][S],
  S extends keyof State["forms"] = keyof State["forms"]
> {
  (form: S, value: State["forms"][S][K]): UpdateFormReturn<K, S>;
}

interface UpdateFormReturn<
  K extends keyof State["forms"][S],
  S extends keyof State["forms"] = keyof State["forms"]
> {
  readonly type: typeof UPDATE_FORM;
  readonly payload: {
    readonly form: S;
    readonly key: K;
    readonly value: State["forms"][S][K];
  };
}

// Open or close form
interface DisplayForm<S extends keyof State["forms"] = keyof State["forms"]> {
  (form: S, value: State["forms"][S]["isOpen"]): void;
}

export const displayForm: DisplayForm = (form, value) => {
  const displayFormAction: UpdateForm<"isOpen"> = (form, value) => {
    return {
      type: UPDATE_FORM,
      payload: {
        form,
        key: "isOpen",
        value
      }
    };
  };
  createAction(
    (): UpdateFormReturn<"isOpen"> => displayFormAction(form, value)
  );
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Change form status to error and set error message and description
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface SetProgressError<
  S extends keyof State["progress"] = keyof State["progress"]
> {
  (
    stateName: S,
    message: State["progress"][S]["error"]["message"],
    description: State["progress"][S]["error"]["description"]
  ): SetProgressErrorReturn<S>;
}

export interface SetProgressErrorReturn<
  S extends keyof State["progress"] = keyof State["progress"]
> {
  type: typeof SET_PROGRESS_ERROR;
  payload: {
    stateName: S;
    message: State["progress"][S]["error"]["message"];
    description: State["progress"][S]["error"]["description"];
  };
}

export const setProgressError: SetProgressError = (
  stateName,
  message,
  description
) => {
  return {
    type: SET_PROGRESS_ERROR,
    payload: {
      stateName,
      message,
      description
    }
  };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Snackbar
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface SnackbarOpen {
  (
    variant: State["snackbar"]["variant"],
    message: State["snackbar"]["message"],
    undo: State["snackbar"]["undo"]
  ): SnackbarOpenReturn;
}

export interface SnackbarOpenReturn {
  type: typeof SNACKBAR_OPEN;
  payload: {
    variant: State["snackbar"]["variant"];
    message: State["snackbar"]["message"];
    undo: State["snackbar"]["undo"];
  };
}

export const openSnackbar: SnackbarOpen = (variant, message, undo) => {
  return {
    type: SNACKBAR_OPEN,
    payload: {
      variant,
      message,
      undo
    }
  };
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// All action returns
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Action creator returns

// interface Action<T, P> {
//   type: T;
//   payload: P;
// }
// export type Actions =
// | Action<typeof UPDATE_FIELD, UpdateFieldReturn<"isInvalid">["payload"]>
// | Action<typeof UPDATE_FIELD, UpdateFieldReturn<"isValid">["payload"]>
// | Action<typeof UPDATE_FIELD, UpdateFieldReturn<"labelWidth">["payload"]>
// | Action<typeof UPDATE_FIELD, UpdateFieldReturn<"value">["payload"]>
// | Action<typeof UPDATE_FORM, UpdateFormReturn<"isOpen">["payload"]>
// | Action<typeof SET_PROGRESS_ERROR, SetProgressErrorReturn["payload"]>
// | Action<typeof SNACKBAR_OPEN, SnackbarOpenReturn["payload"]>;
