import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split Lucide icons into a separate chunk
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Split React and ReactDOM into a separate chunk
          if (id.includes('react')) {
            return 'vendor';
          }
          // Split other large dependencies
          if (id.includes('node_modules')) {
            return 'dependencies';
          }
        }
      }
    }
  }
});