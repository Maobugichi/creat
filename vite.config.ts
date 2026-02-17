import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    minify: 'esbuild', // Use esbuild instead
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],

          'spline': ['@splinetool/react-spline'],
          
         
          'physics': ['@splinetool/runtime'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 2500,
  },
  esbuild: {
    drop: ['console', 'debugger'], // Remove console.logs with esbuild
  },
  css: {
    devSourcemap: true,
  },
})