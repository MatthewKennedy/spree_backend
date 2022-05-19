import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"

const terserOptions = {
  mangle: false,
  compress: false,
  format: {
    beautify: true,
    indent_level: 2
  }
}

export default [
  {
    input: "app/javascript/spree/dashboard/index.js",
    output: {
      file: "app/assets/javascripts/spree_dash.js",
      format: "umd",
      name: "SpreeDash",
      inlineDynamicImports: true,
      sourcemap: false
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(terserOptions)
    ]
  },

  {
    input: "app/javascript/spree/dashboard/index.js",
    output: {
      file: "app/assets/javascripts/spree_dash.esm.js",
      format: "es",
      name: "SpreeDash",
      inlineDynamicImports: true,
      sourcemap: false
    },
    plugins: [
      resolve(),
      commonjs(),
      terser(terserOptions)
    ]
  }
]
