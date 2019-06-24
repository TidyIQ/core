import path from "path";
import fs from "fs";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import { appRootDir } from "../../utils";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Add branding to theme
// ::::::::::::::::::::::::::::::::::::::::::::::::

const BRANDING_CONFIG_FILE = path.join("theme", "branding.js");
const brandingConfigPath = path.join(appRootDir, BRANDING_CONFIG_FILE);

if (fs.existsSync(brandingConfigPath)) {
}

export interface ThemeBranding {
  readonly palette: {
    primary: Theme["palette"]["primary"]["main"];
    secondary: Theme["palette"]["secondary"]["main"];
  };
  readonly typography: {
    readonly fontFamily: {
      text: Theme["typography"]["fontFamily"];
    };
  };
}

export interface SetThemeBranding {
  (themeBranding: ThemeBranding): void;
}

export let themeBranding: ThemeBranding = {
  palette: {
    primary: blue[700],
    secondary: green[800]
  },
  typography: {
    fontFamily: {
      text: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif'
    }
  }
};

export const setThemeBranding: SetThemeBranding = branding => {
  Object.assign(themeBranding, branding);
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Set light or dark theme
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface SetThemeType {
  (type: Theme["palette"]["type"]): void;
}

export let themeType: Theme["palette"]["type"] = "light";

export const setThemeType: SetThemeType = type => {
  themeType = type;
};
