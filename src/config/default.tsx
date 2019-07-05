import { defaultState, State } from "../state/state";
import { defaultReducers, Reducers } from "../state/reducers";
import { defaultBranding, ThemeBranding } from "../theme/branding";
import { defaultPalette, ThemePalette } from "../theme/palette";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface Config {
  state: {
    initialState: State;
    reducers: Reducers;
  };
  theme: {
    branding: ThemeBranding;
    palette: ThemePalette;
  };
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Default configuration
// ::::::::::::::::::::::::::::::::::::::::::::::::

const defaultConfig: Config = {
  state: {
    initialState: defaultState,
    reducers: defaultReducers
  },
  theme: {
    branding: defaultBranding,
    palette: defaultPalette
  }
};

export default defaultConfig;
