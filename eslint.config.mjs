import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: [
      "**/dist/*",
      "**coverage/*",
      "**.github/*",
      "eslint.config.mjs",
      "jest.config.ts",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["./**/*.ts", "./**/*.tsx"],
  },
  {
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
  }
);
