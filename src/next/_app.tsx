import React from "react";
import App, { Container } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme/createTheme";
import { StateProvider } from "../state/store";

class AppProvider extends App {
  componentDidMount(): void {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render(): JSX.Element {
    const { Component, pageProps, children } = this.props;
    return (
      <Container>
        <StateProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            {children}
          </ThemeProvider>
        </StateProvider>
      </Container>
    );
  }
}

export default AppProvider;
