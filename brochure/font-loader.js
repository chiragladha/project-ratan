'use strict';
// Same-origin fonts are packaged by Actions from pinned, licensed Google Fonts files.
let ratanFontPromise;
window.loadRatanFonts=()=>ratanFontPromise||(ratanFontPromise=Promise.all(['InstrumentSerif-Regular.ttf','DMSans.ttf'].map(async name=>{const response=await fetch(new URL('assets/'+name,document.baseURI));if(!response.ok)throw Error('The PDF fonts could not load. Refresh and try again.');const bytes=new Uint8Array(await response.arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(binary);})).then(([serif,sans])=>({serif,sans})).catch(error=>{ratanFontPromise=null;throw error;}));
