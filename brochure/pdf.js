'use strict';
// Local, deterministic PDF export. No customer data or images leave this browser.
(function(root){
  async function buildRatanPDF(d,PDF,loadImage,fonts={}){
    const pdf=new PDF({unit:'mm',format:'a4',compress:true});
    if(fonts.serif&&fonts.sans){pdf.addFileToVFS('InstrumentSerif.ttf',fonts.serif);pdf.addFont('InstrumentSerif.ttf','RatanSerif','normal');pdf.addFileToVFS('DMSans.ttf',fonts.sans);pdf.addFont('DMSans.ttf','RatanSans','normal');}
    const sans=fonts.sans?'RatanSans':'helvetica',serifFont=fonts.serif?'RatanSerif':'times';
    const itemMode=d.mode==='items';
    const ink='#152b23',paper='#f6f3ec',lime='#dcff69',muted='#586a60';
    let y=0,page=0;
    const clean=s=>String(s??'').replace(/₹/g,'INR ').replace(/[–—]/g,'-').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/…/g,'...');
    // Core PDF fonts cover Latin. Fail explicitly instead of producing garbled names.
    const copy=[d.reference,d.customer,d.title,d.brief,d.terms,d.delivery,d.caption,...(d.excluded||[]).flatMap(e=>[e.text,e.reason]),...d.options.flatMap(o=>[o.name,o.spec,o.unit,o.eta])];
    if(copy.some(s=>/[^\x09\x0a\x0d\x20-\xff]/.test(clean(s))))throw Error('For this PDF version, use English / Latin text. Keep other-language notes in the private draft.');
    const money=n=>d.currency+' '+Number(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
    function start(dark=false){if(page)pdf.addPage();page++;pdf.setFillColor(dark?ink:paper);pdf.rect(0,0,210,297,'F');pdf.setTextColor(dark?lime:ink);pdf.setFont(sans,'normal');pdf.setFontSize(17);pdf.text('RATAN.',18,22);pdf.setFont(sans,'normal');pdf.setFontSize(8);pdf.text('MATERIAL PROPOSAL / '+String(page).padStart(2,'0'),192,22,{align:'right'});pdf.setDrawColor(dark?'#52695b':'#c9d0c4');pdf.line(18,29,192,29);pdf.setTextColor(dark?paper:muted);pdf.setFontSize(8);pdf.text(clean(d.reference).slice(0,32)+' / REV '+clean(d.revision),18,283);pdf.text('Ratan Enterprises | +91 98253 38851',192,283,{align:'right'});y=43;}
    function text(value,size=11,color=ink,serif=false){pdf.setFont(serif?serifFont:sans,serif?'normal':'normal');pdf.setFontSize(size);const lines=pdf.splitTextToSize(clean(value),174);const lineHeight=size*.46;for(const line of lines){if(y+lineHeight>266){start(color===paper||color===lime);pdf.setFont(serif?serifFont:sans,'normal');pdf.setFontSize(size);}pdf.setTextColor(color);pdf.text(line,18,y);y+=lineHeight;}y+=5;}
    function heading(value){text(value,27,ink,true);y+=3;}
    function totals(o){const round=n=>Math.round((n+Number.EPSILON)*100)/100;const base=round(Number(o.quantity)*Number(o.price)),tax=round(base*Number(o.tax)/100);return{base,tax,total:round(base+tax+Number(o.shipping))};}
    async function photo(src,x,top,w,h){if(!src)return false;const image=await loadImage(src,{width:w,height:h,fit:d.cover===src?'cover':'contain'});if(typeof image==='string'){pdf.addImage(image,'JPEG',x,top,w,h,undefined,'FAST');}else{const scale=Math.min(w/image.width,h/image.height);pdf.addImage(image.data,'JPEG',x+(w-image.width*scale)/2,top+(h-image.height*scale)/2,image.width*scale,image.height*scale,undefined,'FAST');}return true;}
    start(true);if(d.cover)await photo(d.cover,18,39,174,110);y=d.cover?167:112;text('PREPARED FOR '+d.customer,10,lime);text(d.title,34,paper,true);text('A selection for your space. A clear route to sourcing.',12,paper);text(d.caption||'',9,paper);text('Ahmedabad | Ratan Enterprises',10,lime);
    start();heading(itemMode?'Your material list, clearly quoted.':'Your options, clearly compared.');text(itemMode?'Every requested line, together in one proposal.':'Choose one alternative. Totals below are not added together.',10,muted);
    d.options.forEach((o,i)=>{if(y+35>266)start();pdf.setFillColor('#e4e9df');pdf.rect(18,y-4,174,8,'F');text((itemMode?'ITEM '+(i+1):'OPTION '+String.fromCharCode(65+i)),9);text(o.name,14);text(o.quantity+' '+o.unit+' | Landed total: '+(o.price===''||o.quantity===''||o.tax===''||o.shipping===''?'Pending review':money(totals(o).total)),11);});
    text('Includes entered material tax and tax-inclusive delivery. This is a proposal, not a tax invoice.',9,muted);
    if(itemMode){text('Combined landed total: '+(d.options.some(o=>[o.price,o.quantity,o.tax,o.shipping].some(v=>v===''))?'Pending review':money(d.options.reduce((sum,o)=>sum+totals(o).total,0))),16);}
    start();heading('Your brief & quote terms');text('CUSTOMER REQUIREMENT',9,muted);text(d.brief||'As discussed with the Ratan sourcing desk.');text('BEFORE YOU DECIDE',9,muted);text(d.terms);if(d.excluded?.length){text('EXCLUDED REQUESTS - DESK REVIEW',10,muted);d.excluded.forEach(e=>text(e.text+' | Reason: '+e.reason,10));}text('Valid until: '+d.validUntil+' | Delivery: '+(d.delivery||'To be confirmed'),10);
    for(const [i,o] of d.options.entries()){start();text(itemMode?'ITEM '+(i+1):'OPTION '+String.fromCharCode(65+i),10,muted);heading(o.name);if(o.image){if(y+85>260)start();await photo(o.image,18,y,174,78);y+=88;}text(o.spec,11);const c=totals(o);for(const [k,v] of [['Quantity',o.quantity+' '+o.unit],['Unit rate (excl. tax)',o.price===''?'Pending':money(o.price)],['Material subtotal',o.price===''||o.quantity===''?'Pending':money(c.base)],['Tax ('+o.tax+'%)',o.tax===''||o.price===''?'Pending':money(c.tax)],['Delivery (incl. tax)',o.shipping===''?'Pending':money(o.shipping)],['Availability',o.eta]])text(k+': '+v,10);if(y+30>266)start();pdf.setFillColor(lime);pdf.rect(18,y-3,174,23,'F');y+=7;text('LANDED TOTAL: '+([o.price,o.quantity,o.tax,o.shipping].some(v=>v==='')?'Pending review':money(c.total)),18);y+=9;text('Reply with '+d.reference+', revision '+d.revision+(itemMode?' and Item '+(i+1):' and Option '+String.fromCharCode(65+i))+'. Final acceptance is confirmed by Ratan.',9,muted);}
    pdf.setProperties({title:'Ratan material proposal '+clean(d.reference),author:'Ratan Enterprises',subject:'Material alternatives and quoted prices'});return pdf;
  }
  root.buildRatanPDF=buildRatanPDF;
  if(typeof module!=='undefined')module.exports=buildRatanPDF;
})(typeof window==='undefined'?globalThis:window);
