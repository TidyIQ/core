module.exports = {
  testRegex: "(/__tests__/.int.*|(\\.int.|/)(test|spec))\\.[jt]sx?$",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "utils", __dirname]
};
