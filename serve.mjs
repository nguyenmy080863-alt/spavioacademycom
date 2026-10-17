/**
 * Local preview: serves dist/ on http://localhost:4173 (like Vercel with trailingSlash)
 * and fakes POST /api/reserve by appending to signups.local.jsonl (git-ignored).
 *   node build.mjs && node serve.mjs
 */
import { createServer } from 'node:http';
import { appendFile, readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/reserve' && req.method === 'POST') {
    let body = '';
    for await (const chunk of req) body += chunk;
    await appendFile('signups.local.jsonl', body + '\n');
    res.writeHead(200, { 'Content-Type': 'application/json' }).end('{"ok":true}');
    return;
  }

  let path = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  if (path.includes('..')) return res.writeHead(400).end();
  let file = join(ROOT, path);
  try {
    if ((await stat(file)).isDirectory()) {
      if (!url.pathname.endsWith('/')) return res.writeHead(308, { Location: url.pathname + '/' }).end();
      file = join(file, 'index.html');
    }
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' }).end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}/  (de/, vi/)`));
