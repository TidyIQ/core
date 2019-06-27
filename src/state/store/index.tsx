import React, {
  useReducer,
  createContext,
  Dispatch,
  PropsWithChildren,
  Context
} from "react";
import { AllState } from "../state";
import initialState from "../state/initialState";
import reducer, { Action } from "../reducers";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Context and provider
// https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#user-content-context
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface CreateCtx {
  (): readonly [
    Context<{
      state: AllState;
      dispatch: Dispatch<Action>;
    }>,
    Provider
  ];
}

interface Provider {
  (props: PropsWithChildren<{}>): JSX.Element;
}

const createCtx: CreateCtx = () => {
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

export const Store = create[0];
export const StateProvider = create[1];
