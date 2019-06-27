import path from "path";
import fs from "fs";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Get project root directory
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const INITIALSTATE_CONFIG_FILE = path.join("state", "initialState.tsx");

interface FindConfig {
  (rootDir: string, config: string): string | null;
}

export const findInitialStateConfig: FindConfig = (rootDir, config) => {
  let dirname = rootDir;
  while (true) {
    if (fs.existsSync(path.join(dirname, config))) {
      return dirname;
    }
    const nextDir = path.dirname(dirname);
    if (dirname === nextDir) break;
    dirname = nextDir;
  }
  return null;
};
