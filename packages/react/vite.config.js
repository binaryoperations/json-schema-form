import { defineConfig, } from 'vite';
import { nodeResolve } from '@rollup/plugin-node-resolve';


import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  optimizeDeps: {
    exclude: ['node_modules']
  },
  build: {
    sourcemap: true,
    logLevel: "error",
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      input: {
        "index": "./index.ts"
      },

      output: [
        {
          dir: 'dist/esm',
          format: 'esm',
          preserveModules: true,
          entryFileNames: '[name].js',
        },
        {
          dir: 'dist/cjs',
          format: 'cjs',
          preserveModules: true,
          globals: {'react': 'react' },
          entryFileNames: '[name].js',
        }
      ],
      preserveEntrySignatures: true,
      plugins: [typescript({ tsconfig: "./tsconfig.build.json" })],
    }
  }
})
