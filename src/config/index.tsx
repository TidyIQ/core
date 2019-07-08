import path from "path";
import deepMerge from "deepmerge";
import { defaultState, State } from "../state/state";
import { defaultReducers, Reducers } from "../state/reducers";
import { defaultBranding, ThemeBranding } from "../theme/branding";
import { defaultPalette, ThemePalette } from "../theme/palette";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

interface DefaultConfig {
  readonly state: {
    readonly initialState: State;
    readonly reducers: Reducers;
  };
  readonly theme: {
    readonly branding: ThemeBranding;
    readonly palette: ThemePalette;
  };
}

export type Config = RecursivePartial<DefaultConfig>;

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

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Create path to project root
// ::::::::::::::::::::::::::::::::::::::::::::::::

const CONFIG_FILE = "tiq.config.js";
const PATH_TO_ROOT = process.cwd();

const pathToConfig = path.join(PATH_TO_ROOT, CONFIG_FILE);

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Create configuration object
// ::::::::::::::::::::::::::::::::::::::::::::::::

const config: DefaultConfig = (() => {
  try {
    const userConfig = async (): Promise<Config> =>
      import(pathToConfig).then(i => i.default);
    return deepMerge<DefaultConfig, Promise<Config>>(
      defaultConfig,
      userConfig()
    );
  } catch {
    return defaultConfig;
  }
})();

export default config;
