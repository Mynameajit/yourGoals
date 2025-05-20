import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow access from LAN or ngrok
    allowedHosts: 'all', // ✅ allow ANY host (including ngrok)
  },
});
