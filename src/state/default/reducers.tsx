import { Reducer, addReducer } from "..";
import {
  UPDATE_FORM,
  UPDATE_FIELD,
  SET_PROGRESS_ERROR,
  SNACKBAR_OPEN
} from "./actions";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form field
// ::::::::::::::::::::::::::::::::::::::::::::::::

const updateFieldReducer: Reducer = (state, action) => {
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
};
addReducer(UPDATE_FIELD, updateFieldReducer);

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Update form
// ::::::::::::::::::::::::::::::::::::::::::::::::

const updateFormReducer: Reducer = (state, action) => {
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
};
addReducer(UPDATE_FORM, updateFormReducer);

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Set progress to error
// ::::::::::::::::::::::::::::::::::::::::::::::::

const setProgressErrorReducer: Reducer = (state, action) => {
  return {
    ...state,
    progress: {
      ...state.progress,
      [action.payload.stateName]: {
        ...state.progress[action.payload.stateName],
        error: {
          description: action.payload.description,
          message: action.payload.message
        },
        status: "error"
      }
    }
  };
};
addReducer(SET_PROGRESS_ERROR, setProgressErrorReducer);

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Open the snackbar
// ::::::::::::::::::::::::::::::::::::::::::::::::

const snackbarOpenReducer: Reducer = (state, action) => {
  return {
    ...state,
    snackbar: {
      message: action.payload.message,
      open: true,
      undo: action.payload.undo,
      variant: action.payload.variant
    }
  };
};
addReducer(SNACKBAR_OPEN, snackbarOpenReducer);
