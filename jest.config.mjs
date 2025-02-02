import eslint from "@eslint/js";
import * as tseslint from "typescript-eslint";
import { fileURLToPath } from "url";
import path from "path";

// eslint-disable-next-line @typescript-eslint/typedef
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: ["**/dist/*", "**/coverage/*", "**/.github/*"],
  },
  // For .mjs files
  {
    files: ["**/*.mjs"],
    ...eslint.configs.recommended,
  },
  // For TypeScript files
  {
    files: ["**/*.ts"],
    ...tseslint.configs.recommended,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/typedef": [
        "error",
        {
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          memberVariableDeclaration: true,
          variableDeclarationIgnoreFunction: true,
        },
      ],
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];
