import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// base: '/VastraHub/' is required for GitHub Pages deployment
export default defineConfig({
  plugins: [react()],
  base: '/VastraHub/',
});
