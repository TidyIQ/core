import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { NextFunctionComponent } from "next";
import theme from "../theme/createTheme";
import { StateProvider } from "../state/store";

const AppProvider: NextFunctionComponent = ({ children }) => {
  useEffect((): void => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StateProvider>
  );
};

export default AppProvider;
