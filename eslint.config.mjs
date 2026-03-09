export default [
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
