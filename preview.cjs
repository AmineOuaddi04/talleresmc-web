const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.webp':'image/webp' };
http.createServer((request,response)=>{
  const url = new URL(request.url, 'http://localhost');
  const file = path.resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
  if (!file.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
  fs.readFile(file,(error,data)=>{
    if(error){response.writeHead(404);response.end('Not found');return;}
    response.writeHead(200,{'Content-Type':mime[path.extname(file)] || 'application/octet-stream'});
    response.end(data);
  });
}).listen(4174,'127.0.0.1',()=>console.log('Talleres MC preview: http://127.0.0.1:4174/'));
