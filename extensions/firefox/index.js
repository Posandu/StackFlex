import { buildSync } from 'esbuild';
import fs from 'fs';

fs.rm('dist', { recursive: true }, () => {
  fs.mkdirSync('dist');
  // Copy all files in the src folder to the dist folder
  fs.readdirSync('./src/public').forEach((file) => {
    fs.copyFileSync(`src/public/${file}`, `dist/${file}`);
  });

  buildSync({
    entryPoints: ['./src/index.js'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    target: 'es2020',
  });
});
