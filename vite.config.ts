import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';

export default defineConfig({
  plugins: [
    replace({
      'process.env.REACT_APP_API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.coingecko.com/api/v3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});