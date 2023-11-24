import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pkg from './package.json'

import terser from '@rollup/plugin-terser';

const plugins = [
  nodeResolve(),
  babel({
    exclude: 'node_modules/**',
  }),
  terser(),
]

// libraries to not included in export / peer dependencies
const external = []

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'validation',
      file: pkg.browser,
      format: 'umd',
    },
    external,
    plugins: [del({ targets: ['dist/*', 'build/*'] }), commonjs(), ...plugins],
  },
  {
    input: 'src/index.js',
    external,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins,
  },
]
