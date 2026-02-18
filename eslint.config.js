import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // 1. Base JS Config (Replaces "extends": ["js/recommended"])
  js.configs.recommended,

  // 2. Base TS Config (Spread the array!)
  ...tseslint.configs.recommended,

  // 3. Your Custom Rules
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node, // This includes 'process', so you don't need to add it manually
      },
    },
    rules: {
      // ✅ LOGIC RULES
      "no-console": "warn",
      "prefer-const": "error",
      "no-unused-expressions": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-undef": "off",
    },
  },
  prettierConfig,
];
