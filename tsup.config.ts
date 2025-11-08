import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'validation/index': 'src/validation/index.ts',
    'format/index': 'src/format/index.ts',
    'brazil/index': 'src/brazil/index.ts',
    'converter/index': 'src/converter/index.ts',
    'utils/index': 'src/utils/index.ts',
    'date/index': 'src/date/index.ts',
    'security/index': 'src/security/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  outDir: 'dist',
  esbuildOptions(options) {
    options.conditions = ['import', 'require'];
  },
});

