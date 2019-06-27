/* eslint-disable @typescript-eslint/no-var-requires */

// Include environmental variables support
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

// Include Typescript support for Next.js
const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript({
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  }
});
