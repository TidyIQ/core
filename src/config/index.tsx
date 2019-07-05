import findUp from "find-up";
import deepMerge from "deepmerge";
import defaultConfig, { Config } from "./default";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Create configuration object
// ::::::::::::::::::::::::::::::::::::::::::::::::

const createConfig = (() => {
  const path = findUp.sync("tiq.config.js");
  if (path && path.length) {
    const userConfigModule: Config = module.require(path);
    return deepMerge(defaultConfig, userConfigModule);
  }
  return defaultConfig;
})();

export default createConfig;
