import react from '@vitejs/plugin-react';
import { defineConfig, type PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()].flat() as PluginOption[],
});
