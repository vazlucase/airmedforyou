import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", "out/**", ".e2e-tmp/**"],
  },
];

export default eslintConfig;
