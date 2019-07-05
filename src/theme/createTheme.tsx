import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions, Theme } from "@material-ui/core/styles/createMuiTheme";
import {
  createVibrantBackground,
  createBackgroundGradient
} from "../utils/functions";
import config from "../config";

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Typescript
// ::::::::::::::::::::::::::::::::::::::::::::::::

interface CustomOptions {
  typography: {
    textShadow: string;
  };
  background: {
    vibrant: {
      primary: string;
      secondary: string;
    };
    gradient: {
      primary: string;
      secondary: string;
    };
  };
  palette: {
    success: string;
    warn: string;
    info: string;
    focusedInput: {
      label: string;
      border: string;
      icon: string;
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
// Constants
// ::::::::::::::::::::::::::::::::::::::::::::::::

const { palette, branding } = config.theme;

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Set theme colors and fonts
// ::::::::::::::::::::::::::::::::::::::::::::::::

const createMyTheme = (options?: ThemeOptions): Theme => {
  return createMuiTheme({
    palette: {
      primary: {
        main: branding.palette.primary
      },
      secondary: {
        main: branding.palette.secondary
      }
    },
    typography: {
      fontFamily: branding.typography.fontFamily.text,
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
          primary: createVibrantBackground(branding.palette.primary),
          secondary: createVibrantBackground(branding.palette.secondary)
        },
        gradient: {
          primary: createBackgroundGradient(branding.palette.primary),
          secondary: createBackgroundGradient(branding.palette.secondary)
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
