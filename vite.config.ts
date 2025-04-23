import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfig from './tsconfig.json';

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const aliases: Record<string, string> = {};

  for (const [key, [target]] of Object.entries(paths)) {
    const cleanKey = key.replace('/*', '');
    const cleanTarget = target.replace('/*', '');
    aliases[cleanKey] = path.resolve(__dirname, 'src', cleanTarget);
  }

  return aliases;
};

export default defineConfig({
  plugins: [react()],
  base: '/kts/',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "styles/variables.scss" as *; @use "styles/mixins.scss" as *;`,
      },
    },
  },
});
