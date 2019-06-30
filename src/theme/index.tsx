// import path from "path";
// import fs from "fs";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Add branding to theme
// ::::::::::::::::::::::::::::::::::::::::::::::::

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

export const themeBranding: ThemeBranding = {
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
