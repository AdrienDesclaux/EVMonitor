import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
  // server: {
  //   port: 5173,
  //   proxy: {
  //     '/users': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true
  //     },
  //     '/user': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true
  //     },
  //     '/refresh_token': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true
  //     },
  //     '/addresses': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true
  //     }
  //   }
  // }
});
