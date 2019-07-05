import { defaultState, State } from "../state/state";
import { defaultReducers, Reducers } from "../state/reducers";
import { defaultBranding, ThemeBranding } from "../theme/branding";
import { defaultPalette, ThemePalette } from "../theme/palette";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface DefaultConfig {
  readonly state: {
    readonly initialState: State;
    readonly reducers: Reducers;
  };
  readonly theme: {
    readonly branding: ThemeBranding;
    readonly palette: ThemePalette;
  };
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Default configuration
// ::::::::::::::::::::::::::::::::::::::::::::::::

const defaultConfig: DefaultConfig = {
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
