import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@c', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@p', replacement: path.resolve(__dirname, 'src/pages') },
            { find: '~', replacement: path.resolve(__dirname, 'src') },
            { find: '@a', replacement: path.resolve(__dirname, 'src/asset') },
        ],
    },
    build: {
        outDir: 'build',
    },
    server: {
        host: 'localhost',
        port: 5173,
        open: 'http://localhost:5173',
    },
    optimizeDeps: {
        exclude: ['js-big-decimal'],
    },
});
