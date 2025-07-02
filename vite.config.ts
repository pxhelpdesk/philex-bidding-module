import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    server: {
        host:'172.17.1.237',
        port:4101,
        cors:true,
        // https: {
        //     key: fs.readFileSync('crt/pmc-website.local/www.philexmining.com.ph.key'),
        //     cert: fs.readFileSync('crt/pmc-website.local/CEPO250219726679.cer'),
        //},
    },
});
