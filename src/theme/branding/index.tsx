import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

export interface ThemeBranding {
  readonly palette: {
    primary: string;
    secondary: string;
  };
  readonly typography: {
    readonly fontFamily: {
      text: string;
    };
  };
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Default branding
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const defaultBranding: ThemeBranding = {
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
