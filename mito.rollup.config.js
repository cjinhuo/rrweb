import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
let configs = {
  input: './src/mito/index.ts',
  plugins: [
    resolve({ browser: true }),
    typescript(),
    postcss({
      extract: true,
      minimize: true,
      // sourceMap: true,
    }),
    // terser(),
  ],
  output: [
    {
      name: 'mitoRRWeb',
      format: 'iife',
      file: '/Users/ks/Desktop/tryCatch/mito/dist/mitoRRweb.min.js',
      // sourcemap: true,
    },
  ],
};

export default configs;
