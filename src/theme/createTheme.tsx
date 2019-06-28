import { CSSProperties } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions, Theme } from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import { themeBranding } from "../../../../theme/branding";
import {
  createVibrantBackground,
  createBackgroundGradient
} from "../utils/functions";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Constants
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface Palette {
  info: CSSProperties["color"];
  success: CSSProperties["color"];
  warn: CSSProperties["color"];
}
const palette: Palette = {
  info: blue[700],
  success: green[800],
  warn: amber[700]
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface CustomOptions {
  typography: {
    textShadow: CSSProperties["textShadow"];
  };
  background: {
    vibrant: {
      primary: CSSProperties["backgroundColor"];
      secondary: CSSProperties["backgroundColor"];
    };
    gradient: {
      primary: CSSProperties["backgroundColor"];
      secondary: CSSProperties["backgroundColor"];
    };
  };
  palette: {
    success: CSSProperties["color"];
    warn: CSSProperties["color"];
    info: CSSProperties["color"];
    focusedInput: {
      label: CSSProperties["color"];
      border: CSSProperties["color"];
      icon: CSSProperties["color"];
    };
  };
}
declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    custom: CustomOptions;
  }
  interface ThemeOptions {
    custom?: CustomOptions;
  }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Set theme colors and fonts
// ::::::::::::::::::::::::::::::::::::::::::::::::

const createMyTheme = (options?: ThemeOptions): Theme => {
  return createMuiTheme({
    palette: {
      primary: {
        main: themeBranding.palette.primary
      },
      secondary: {
        main: themeBranding.palette.secondary
      },
      type: "light"
    },
    typography: {
      fontFamily: themeBranding.typography.fontFamily.text,
      h1: {
        fontFamily:
          '"Montserrat", "Open Sans", "Roboto", "Helvetica", "Arial", sans-serif'
      },
      h2: {
        fontFamily:
          '"Montserrat", "Open Sans", "Roboto", "Helvetica", "Arial", sans-serif'
      },
      h3: {
        fontFamily:
          '"Montserrat", "Open Sans", "Roboto", "Helvetica", "Arial", sans-serif'
      },
      h4: {
        fontFamily:
          '"Montserrat", "Open Sans", "Roboto", "Helvetica", "Arial", sans-serif'
      }
    },
    ...options
  });
};

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Add custom variables
// ::::::::::::::::::::::::::::::::::::::::::::::::

const myTheme = createMyTheme();
const createCustomTheme = (options?: ThemeOptions): Theme =>
  createMyTheme({
    custom: {
      typography: {
        textShadow: "0 1px 2px rgba(0,0,0,0.20)"
      },
      background: {
        vibrant: {
          primary: createVibrantBackground(themeBranding.palette.primary),
          secondary: createVibrantBackground(themeBranding.palette.secondary)
        },
        gradient: {
          primary: createBackgroundGradient(themeBranding.palette.primary),
          secondary: createBackgroundGradient(themeBranding.palette.secondary)
        }
      },
      palette: {
        success: palette.success,
        warn: palette.warn,
        info: palette.info,
        focusedInput: {
          label: myTheme.palette.primary.dark,
          border: myTheme.palette.primary.main,
          icon: myTheme.palette.primary.dark
        }
      }
    },
    ...options
  });

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Override theme defaults and export theme
// ::::::::::::::::::::::::::::::::::::::::::::::::

const customTheme = createCustomTheme();
const theme = createCustomTheme({
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: customTheme.palette.grey["800"]
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: customTheme.custom.palette.focusedInput.label
        }
      }
    },
    MuiInputLabel: {
      outlined: {
        "&$marginDense": {
          transform: "translate(14px, 17px) scale(1)"
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        "&:hover $notchedOutline": {
          borderColor: customTheme.custom.palette.focusedInput.border
        },
        "&$focused $notchedOutline": {
          borderColor: customTheme.custom.palette.focusedInput.border
        },
        "&$adornedStart fieldset": {
          paddingLeft: `${customTheme.spacing(6.5)}px !important`
        },
        "&$adornedStart:not($error) svg": {
          color: customTheme.custom.palette.focusedInput.icon
        }
      },
      inputAdornedStart: {
        marginLeft: customTheme.spacing(1)
      },
      inputMarginDense: {
        paddingTop: 15,
        paddingBottom: 15
      }
    }
  }
});

export default theme;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Create light theme variant
// ::::::::::::::::::::::::::::::::::::::::::::::::

export const lightTheme = (): Theme =>
  createMuiTheme({
    ...theme,
    palette: {
      type: "light"
    }
  });
