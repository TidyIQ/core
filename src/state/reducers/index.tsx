import {
  UPDATE_FIELD,
  UpdateField,
  UPDATE_FORM,
  UpdateForm,
  SET_PROGRESS_ERROR,
  SetProgressError,
  SNACKBAR_OPEN,
  SnackbarOpen,
  SNACKBAR_CLOSE,
  SnackbarClose
} from "../actions";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface Action {
  type: string;
  payload: any;
}

export interface Reducer<T extends (...args: any) => any> {
  [key: string]: (action: ReturnType<T>) => Record<string, any>;
}

export interface Reducers {
  [key: string]: (action: Action) => Reducer<any>;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form field
// ::::::::::::::::::::::::::::::::::::::::::::::::

const updateFieldReducer: Reducer<UpdateField> = {
  [UPDATE_FIELD]: action => {
    return {
      forms: {
        [action.payload.form]: {
          fields: {
            [action.payload.field]: {
              [action.payload.key]: action.payload.value
            }
          }
        }
      }
    };
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form
// ::::::::::::::::::::::::::::::::::::::::::::::::

const updateFormReducer: Reducer<UpdateForm> = {
  [UPDATE_FORM]: action => {
    return {
      forms: {
        [action.payload.form]: {
          [action.payload.key]: action.payload.value
        }
      }
    };
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Set progress to error
// ::::::::::::::::::::::::::::::::::::::::::::::::

const setProgressErrorReducer: Reducer<SetProgressError> = {
  [SET_PROGRESS_ERROR]: action => {
    return {
      progress: {
        [action.payload.progress]: {
          error: {
            description: action.payload.description,
            message: action.payload.message
          },
          status: action.payload.status
        }
      }
    };
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Close snackbar
// ::::::::::::::::::::::::::::::::::::::::::::::::

const snackbarCloseReducer: Reducer<SnackbarClose> = {
  [SNACKBAR_OPEN]: action => {
    return {
      snackbar: {
        open: action.payload.open
      }
    };
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Open snackbar
// ::::::::::::::::::::::::::::::::::::::::::::::::

const snackbarOpenReducer: Reducer<SnackbarOpen> = {
  [SNACKBAR_CLOSE]: action => {
    return {
      snackbar: {
        message: action.payload.message,
        open: action.payload.open,
        undo: action.payload.undo,
        variant: action.payload.variant
      }
    };
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// All reducers
// ::::::::::::::::::::::::::::::::::::::::::::::::

const defaultReducers: Reducers = {
  ...updateFieldReducer,
  ...updateFormReducer,
  ...setProgressErrorReducer,
  ...snackbarOpenReducer,
  ...snackbarCloseReducer
};

export { defaultReducers };
