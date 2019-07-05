import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface ThemePalette {
  info: string;
  success: string;
  warn: string;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Default palette
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const defaultPalette: ThemePalette = {
  info: blue[700],
  success: green[800],
  warn: amber[700]
};
