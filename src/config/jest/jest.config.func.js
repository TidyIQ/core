export const testRegex =
  "(/__tests__/.func.*|(\\.func.|/)(test|spec))\\.[jt]sx?$";
export const testPathIgnorePatterns = [
  "<rootDir>/.next/",
  "<rootDir>/node_modules/"
];
export const moduleDirectories = ["node_modules", "utils", __dirname];
