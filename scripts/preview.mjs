import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../site/', import.meta.url));
const port = Number(process.env.GLYPH_PREVIEW_PORT || 4173);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8','.ico':'image/x-icon','.xml':'application/xml'};
const server = http.createServer(async (req,res) => {
  try {
    let name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if (name.endsWith('/')) name += 'index.html';
    const file = path.resolve(root, '.' + name);
    if (!file.startsWith(root) || path.basename(file).startsWith('_')) { res.writeHead(404); res.end('Not found'); return; }
    let data, status = 200, ext = path.extname(file);
    try { if (!(await stat(file)).isFile()) throw new Error('Not a file'); data = await readFile(file); }
    catch { data = await readFile(path.join(root,'404.html')); status = 404; ext = '.html'; }
    res.writeHead(status,{'Content-Type':mime[ext] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"});
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(400); res.end('Bad request'); }
});
server.listen(port,'127.0.0.1',() => console.log(`GlyphGuardian preview: http://127.0.0.1:${port}`));
process.on('SIGTERM',() => server.close());
