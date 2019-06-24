import React, {
  useReducer,
  createContext,
  Dispatch,
  PropsWithChildren,
  Context,
  useContext
} from "react";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// State
// ::::::::::::::::::::::::::::::::::::::::::::::::

const initialState: State = {};

// Dependency injection
export interface CreateState {
  (state: State): void;
}
export const addState: CreateState = userState => {
  Object.assign(initialState, userState);
};

// State
export interface State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Reducer
// ::::::::::::::::::::::::::::::::::::::::::::::::

const allReducers: Record<string, Reducer> = {};

// Dependency injection
export interface AddReducer {
  (type: string, fn: (state: State, actions: Actions) => State): void;
}
export const addReducer: AddReducer = (type, fn) => {
  Object.assign(allReducers, { [type]: fn });
};

export interface Reducer {
  (state: State, action: Actions): State;
}

const reducer: Reducer = (state, action) => {
  if (allReducers[action.type]) {
    return Object.assign<{}, State, State>(
      {},
      state,
      allReducers[action.type](state, action)
    );
  }
  return state;
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Context and provider
// https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#user-content-context
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface CreateCtx {
  (): readonly [
    Context<{
      state: State;
      dispatch: Dispatch<Actions>;
    }>,
    Provider
  ];
}

interface Provider {
  (props: PropsWithChildren<{}>): JSX.Element;
}

const createCtx: CreateCtx = () => {
  const defaultDispatch: Dispatch<Actions> = () => initialState;
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

export const [Store, StateProvider] = createCtx();

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Actions
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface Actions {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>;
}

interface CreateAction {
  (fn: () => Actions): void;
}
export const createAction: CreateAction = fn => {
  const { dispatch } = useContext(Store);
  dispatch(fn());
};
