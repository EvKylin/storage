import json from "rollup-plugin-json";
export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "umd",
    name: 'DB'
  },
  plugins: [json()]
};
