module.exports = {
  testRegex: "(/__tests__/.unit*|(\\.unit.|/)(test|spec))\\.[jt]sx?$",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "utils", __dirname]
};
