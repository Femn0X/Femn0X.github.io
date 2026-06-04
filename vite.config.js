import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // For femn0x.github.io (user/org site) base is '/'
  // If it were a project site (femn0x.github.io/repo) it would be '/repo/'
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
  }
})
