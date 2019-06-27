import { AllState } from "../state";
import {
  UPDATE_FIELD,
  UPDATE_FORM,
  SET_PROGRESS_ERROR,
  SNACKBAR_OPEN,
  UpdateFormReturn,
  UpdateFieldReturn,
  SetProgressErrorReturn,
  SnackbarOpenReturn
} from "../actions/default";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface Reducer<T> {
  [key: string]: (state: AllState, action: T) => AllState;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form field
// ::::::::::::::::::::::::::::::::::::::::::::::::

const updateFieldReducer: Reducer<UpdateFieldReturn> = {
  [UPDATE_FIELD]: (state, action) => {
    return {
      ...state,
      forms: {
        ...state.forms,
        [action.payload.form]: {
          ...state.forms[action.payload.form],
          fields: {
            ...state.forms[action.payload.form].fields,
            [action.payload.field]: {
              ...state.forms[action.payload.form].fields[action.payload.field],
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

const updateFormReducer: Reducer<UpdateFormReturn> = {
  [UPDATE_FORM]: (state, action) => {
    if (state.forms) {
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.form]: {
            ...state.forms[action.payload.form],
            [action.payload.key]: action.payload.value
          }
        }
      };
    }
    return state;
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Set progress to error
// ::::::::::::::::::::::::::::::::::::::::::::::::

const setProgressErrorReducer: Reducer<SetProgressErrorReturn> = {
  [SET_PROGRESS_ERROR]: (state, action) => {
    if (state.progress) {
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload.progress]: {
            ...state.progress[action.payload.progress],
            error: {
              description: action.payload.description,
              message: action.payload.message
            },
            status: "error"
          }
        }
      };
    }
    return state;
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Open snackbar
// ::::::::::::::::::::::::::::::::::::::::::::::::

const snackbarOpenReducer: Reducer<SnackbarOpenReturn> = {
  [SNACKBAR_OPEN]: (state, action) => {
    return {
      ...state,
      snackbar: {
        message: action.payload.message,
        open: true,
        undo: action.payload.undo,
        variant: action.payload.variant
      }
    };
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// All reducers
// ::::::::::::::::::::::::::::::::::::::::::::::::

const defaultReducers = {
  ...updateFieldReducer,
  ...updateFormReducer,
  ...setProgressErrorReducer,
  ...snackbarOpenReducer
};

export default defaultReducers;
