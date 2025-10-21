import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// Fix: Import `cwd` from `node:process` to resolve TypeScript error where `process.cwd` was not found.
import { cwd } from 'node:process';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Fix: Cannot find name '__dirname'.
          // Replaced `__dirname` with `cwd()` because `__dirname` is not available in an ESM context.
          '@': path.resolve(cwd(), '.'),
        }
      }
    };
});