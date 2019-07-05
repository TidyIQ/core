import deepMerge from "deepmerge";
import React, {
  useReducer,
  createContext,
  Dispatch,
  PropsWithChildren,
  Context
} from "react";
import { State } from "../state";
import config from "../../config";
import { Action } from "../reducers";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface CreateCtx {
  (): readonly [
    Context<{
      state: State;
      dispatch: Dispatch<Action>;
    }>,
    Provider
  ];
}

interface Provider {
  (props: PropsWithChildren<{}>): JSX.Element;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Reducer
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface ReducerFunction {
  (state: State, action: Action): State;
}

const reducer: ReducerFunction = (state, action) => {
  const allReducers = config.state.reducers;
  if (allReducers[action.type]) {
    const newState = deepMerge(state, allReducers[action.type](action));
    return Object.assign<{}, State, State>({}, state, newState);
  }
  return state;
};

export default reducer;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Context and provider
// https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#user-content-context
// ::::::::::::::::::::::::::::::::::::::::::::::::

const createCtx: CreateCtx = () => {
  const { initialState } = config.state;
  const defaultDispatch: Dispatch<Action> = () => initialState;
  const ctx = createContext({
    state: initialState,
    dispatch: defaultDispatch
  });
  const Provider: Provider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  };
  return [ctx, Provider];
};

const create = createCtx();
const store = create[0];
const StateProvider = create[1];

export { store, StateProvider };
