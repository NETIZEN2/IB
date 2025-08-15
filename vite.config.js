import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './src/main.js',
        header: './src/components/layout/Header.js',
        priority: './src/components/layout/PriorityFeed.js',
        analysis: './src/components/layout/AnalysisPanel.js'
      }
    }
  }
});
