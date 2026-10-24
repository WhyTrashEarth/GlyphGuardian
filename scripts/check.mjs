import {readFile,access} from 'node:fs/promises';
const root=new URL('../site/',import.meta.url);
for(const page of ['index.html','privacy.html','404.html']){
  const text=await readFile(new URL(page,root),'utf8');
  for(const [,url] of text.matchAll(/(?:src|href)="(\/[^"#?]*)/g)){
    await access(new URL(url==='/'?'index.html':url.slice(1),root));
  }
  if(page!=='404.html' && /noindex/.test(text))throw new Error(`Production page is blocked from indexing: ${page}`);
}
const html=await readFile(new URL('index.html',root),'utf8');
for(const [,id] of html.matchAll(/href="#([^"]+)"/g))if(!html.includes(`id="${id}"`))throw new Error(`Missing anchor ${id}`);
const js=await readFile(new URL('app.js',root),'utf8');
if(/innerHTML|localStorage|sessionStorage|fetch\(|XMLHttpRequest/.test(js))throw new Error('Unexpected HTML injection, storage, or network API');
for(const filename of ['bark-texture.webp','dm-sans-400.ttf','dm-sans-700.ttf','space-grotesk-400.ttf','space-grotesk-700.ttf','social-preview.png','favicon.svg','apple-touch-icon.png'])await access(new URL('assets/'+filename,root));
for(const marker of ['rel="canonical" href="https://glyphguardian.com/"','property="og:url" content="https://glyphguardian.com/"','property="og:image" content="https://glyphguardian.com/assets/social-preview.png"','name="twitter:card" content="summary_large_image"'])if(!html.includes(marker))throw new Error(`Missing production metadata: ${marker}`);
const png=await readFile(new URL('assets/social-preview.png',root));
if(png.readUInt32BE(16)!==1200 || png.readUInt32BE(20)!==630)throw new Error('Wrong social image dimensions');
const robots=await readFile(new URL('robots.txt',root),'utf8');
if(/^Disallow:\s*\/\s*$/m.test(robots)||!robots.includes('Sitemap: https://glyphguardian.com/sitemap.xml'))throw new Error('Wrong production robots directives');
await access(new URL('favicon.ico',root));
await access(new URL('sitemap.xml',root));
console.log('Pages, assets, anchors, production metadata, social image, and inspector privacy checks passed.');
