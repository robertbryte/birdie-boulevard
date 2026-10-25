import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(import.meta.dirname);
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4'
};

createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const clean = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
  let file = join(root, clean === '/' ? 'index.html' : clean);
  const relative = file.slice(root.length + 1);
  if (!file.startsWith(root) || relative.split(/[\\/]/).some(part => part.startsWith('.')) || relative.startsWith('tests/')) {
    res.writeHead(404); res.end('Not found'); return;
  }
  try { if (statSync(file).isDirectory()) file = join(file, 'index.html'); }
  catch { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, {
    'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=86400',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });
  createReadStream(file).pipe(res);
}).listen(port, '0.0.0.0', () => console.log(`Birdie Boulevard listening on ${port}`));
