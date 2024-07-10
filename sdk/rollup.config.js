import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.module,
      inlineDynamicImports: true,
      format: 'esm',
      sourcemap: true,
      sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
        // Not sure why rollup otherwise adds an extra '../' to the path

        // Adjust the path transformation logic as needed
        return relativeSourcePath.replace(/^..\//, '');
      },
    },
    {
      file: packageJson.main,
      inlineDynamicImports: true,
      format: 'cjs',
      sourcemap: true,
      sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
        // Not sure why rollup otherwise adds an extra '../' to the path

        // Adjust the path transformation logic as needed
        return relativeSourcePath.replace(/^..\//, '');
      },
    },
  ],
  plugins: [
    external(),
    typescript({ tsconfig: './tsconfig.json' }),
    nodeResolve({
      browser: true,
    }),
    json(),
    terser(),
  ],
  external: [],
};
