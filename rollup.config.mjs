import pkg from './package.json' assert { type: "json" };
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {})
    ],
    onwarn: (warning) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      console.warn(warning.message);
    },
  },
];
