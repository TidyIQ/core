import userReducers from "../../../../../state/reducers";
import defaultReducers from "./default";
import { AllState } from "../state";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Reducer
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface Action {
  type: string;
  payload: any;
}

interface Reducer {
  (state: AllState, action: Action): AllState;
}

const allReducers = {
  ...defaultReducers,
  ...userReducers
};

const reducer: Reducer = (state, action) => {
  if (allReducers[action.type]) {
    return Object.assign<{}, AllState, AllState>(
      {},
      state,
      allReducers[action.type](state, action)
    );
  }
  return state;
};

export default reducer;
