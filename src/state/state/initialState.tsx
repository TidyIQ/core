import userState from "../../../../../state/initialState";
import defaultState from "./default";
import { AllState } from ".";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Initial state
// ::::::::::::::::::::::::::::::::::::::::::::::::

const initialState: AllState = {
  ...defaultState,
  ...userState
};

export default initialState;
