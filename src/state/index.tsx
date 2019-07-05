import {
  updateField,
  updateForm,
  setProgressError,
  openSnackbar,
  closeSnackbar
} from "./actions";
import { store, StateProvider } from "./store";
import { Reducer, Reducers } from "./reducers";
import { State } from "./state";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// State
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Typescript
export type InitialState = Partial<State>;
export { State };

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Actions
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Default actions
export {
  updateField,
  updateForm,
  setProgressError,
  openSnackbar,
  closeSnackbar
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Reducers
// ::::::::::::::::::::::::::::::::::::::::::::::::

// Typescript
export { Reducer, Reducers };

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Store
// ::::::::::::::::::::::::::::::::::::::::::::::::

export { store, StateProvider };
