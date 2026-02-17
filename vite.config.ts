import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path' // Use node:path for best ESM compatibility
import fs from 'node:fs/promises' // Needed to read/write the file
import { visualizer } from 'rollup-plugin-visualizer'
import Beasties from 'beasties'
import type { Plugin } from 'vite';
import type { OutputOptions, OutputBundle } from 'rollup';


function criticalCSSPlugin(): Plugin {
  return {
    name: 'critical-css',
    apply: 'build', 
    async writeBundle(options: OutputOptions, _bundle: OutputBundle) {
      
      const outDir = options.dir || 'dist';
      const htmlFilePath = path.resolve(outDir, 'index.html');

      try {
        // Check if the file exists before reading
        await fs.access(htmlFilePath);
        const html = await fs.readFile(htmlFilePath, 'utf-8');

        const beasties = new Beasties({
          path: outDir,
          publicPath: '/',
          preload: 'swap',
          pruneSource: false,
          inlineFonts: false,
        });

        const processedHtml = await beasties.process(html);
        await fs.writeFile(htmlFilePath, processedHtml);
        
        console.log('✅ Critical CSS injected.');
      } catch (e) {
        // If index.html doesn't exist (e.g., SSR builds), just skip
        console.warn('Critical CSS skip: index.html not found in output directory.');
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    criticalCSSPlugin(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'three-vendor': ['three'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
     modulePreload: {
      // ✅ Don't auto-inject <link rel="modulepreload"> for every chunk.
      // Three.js won't be preloaded — it loads only when SphereBg is actually needed.
      resolveDependencies: (_filename, deps) => {
        return deps.filter(dep => !dep.includes('three-vendor'));
      },
    },
    chunkSizeWarningLimit: 2500,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  css: {
    devSourcemap: true,
  },
})