import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

function preloadCSSPlugin() {
  return {
    name: 'preload-css',
    transformIndexHtml(
      html: string,
      ctx: { bundle?: Record<string, unknown>; server?: unknown }
    ) {
      // ✅ Skip entirely in dev mode
      if (ctx.server) return html
      if (!ctx.bundle) return html

      const cssFiles = Object.keys(ctx.bundle).filter(f => f.endsWith('.css'))
      if (cssFiles.length === 0) return html

      const preloadTags = cssFiles
        .map(f => `<link rel="preload" as="style" href="/${f}">`)
        .join('\n    ')

      return html.replace('<head>', `<head>\n    ${preloadTags}`)
    },
  }
}
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preloadCSSPlugin(),
    visualizer({
      open: false, // don't auto-open on every build in CI/prod
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
    chunkSizeWarningLimit: 2500,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  css: {
    devSourcemap: true,
  },
})