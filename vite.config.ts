import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs/promises'
import { visualizer } from 'rollup-plugin-visualizer'
import Beasties from 'beasties'
import type { Plugin } from 'vite';
import type { OutputOptions, OutputBundle } from 'rollup';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';



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
    ViteImageOptimizer({
     
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
      
     
      include: /\.(png|jpe?g|webp|avif)$/i,
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
      manualChunks(id) {
        // React ecosystem
        if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
          return 'react-vendor';
        }
        
        // Motion/Framer
        if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
          return 'motion-vendor';
        }
        
     
        if (id.includes('src/components/layout/about')) {
          return 'about';
        }
        if (id.includes('src/components/layout/featured')) {
          return 'featured';
        }
        if (id.includes('src/components/layout/footer')) {
          return 'footer';
        }
        if (id.includes('src/components/layout/faq')) {
          return 'faq';
        }
        if (id.includes('src/components/marqsection')) {
          return 'marqsection';
        }
        
        // Everything else goes to default chunks
        return undefined;
      },
      chunkFileNames: 'assets/js/[name]-[hash].js',
      entryFileNames: 'assets/js/[name]-[hash].js',
      assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
    },
  },
  modulePreload: false,
  chunkSizeWarningLimit: 2500,
},
  esbuild: {
    drop: ['console', 'debugger'],
  },
  css: {
    devSourcemap: true,
  },
})