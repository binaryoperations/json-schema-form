import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, type PluginOption } from 'vite';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()].flat() as PluginOption[],
  resolve: {
    "alias": {
      "@binaryoperations/json-forms-react": path.resolve(__dirname, "../../react"),
      "@binaryoperations/json-forms-core": path.resolve(__dirname, "../../core"),
    }
  }
});
