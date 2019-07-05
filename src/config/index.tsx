import findUp from "find-up";
import deepMerge from "deepmerge";
import defaultConfig, { DefaultConfig } from "./default";

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

export type Config = RecursivePartial<DefaultConfig>;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Create configuration object
// ::::::::::::::::::::::::::::::::::::::::::::::::

const config = (() => {
  const path = findUp.sync("tiq.config.js");
  if (path && path.length) {
    const userConfigModule = module.require(path);
    return deepMerge(defaultConfig, userConfigModule);
  }
  return defaultConfig;
})();

export default config;
