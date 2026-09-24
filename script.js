'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const designs = window.RATAN_CATALOGUE || [];
const materials = [
  {id:'ply',name:'Plywood & boards',category:'Boards',spec:'MR, BWR, BWP · grade and thickness to confirm',unit:'sheets',look:'wood'},
  {id:'mdf',name:'MDF / HDHMR boards',category:'Boards',spec:'For cabinetry and interior applications',unit:'sheets',look:'wood'},
  {id:'wood',name:'Woodgrain laminates',category:'Laminates',spec:'Explore natural wood looks from our catalogue',unit:'sheets',collection:'Suede Finish',image:'assets/inster/5075-sf.webp'},
  {id:'solid',name:'Solid colour laminates',category:'Laminates',spec:'Explore plain colours, from light to dark',unit:'sheets',collection:'Plain Color',image:'assets/inster/5186-sf.webp'},
  {id:'hinge',name:'Hinges & drawer channels',category:'Hardware',spec:'Opening type, load and dimensions to confirm',unit:'sets',look:'hardware'},
  {id:'screw',name:'Screws, nuts & bolts',category:'Hardware',spec:'Sizes and finish matched to your application',unit:'packs',look:'hardware'},
  {id:'adhesive',name:'Adhesives & edge bands',category:'Hardware',spec:'Matched to your board and surface',unit:'sets',tone:'#b2ad81'},
  {id:'light',name:'Decorative & task lights',category:'Electrical',spec:'Pendant, wall and task lighting on request',unit:'pieces',look:'lights'},
  {id:'fan',name:'Ceiling fans',category:'Electrical',spec:'Sweep, controls and finish to confirm',unit:'pieces',tone:'#b6bdb1'},
  {id:'switch',name:'Switches & electrical items',category:'Electrical',spec:'Switch plates, sockets and accessories',unit:'sets',look:'hardware'},
  {id:'paint',name:'Interior paints',category:'Wall finishes',spec:'Colour, coverage and wall preparation to confirm',unit:'litres',tone:'#d89b80'},
  {id:'wallpaper',name:'Wallpaper & digital prints',category:'Wall finishes',spec:'Custom wall dimensions · artwork approval',unit:'sq ft',look:'walls'}
];
const products = [...materials,...designs];
const bundles = [
  {name:'The wardrobe edit',description:'Boards + laminate + fittings',items:['ply','wood','hinge','adhesive']},
  {name:'The living room layer',description:'Surfaces + walls + lighting',items:['ply','solid','light','wallpaper']},
  {name:'The room refresh',description:'Colour + comfort + details',items:['paint','fan','switch','light']}
];
const shortlist = new Map();
let selectedCategory='All', collectionFinish='', designPage=0, detailFromCollection=false;
let activeKind='General enquiry', activeBrief='', submissionFingerprint='';
const PAGE_SIZE=6;
function node(tag,text,className){
  const el=document.createElement(tag);
  if(text!==undefined)el.textContent=text;
  if(className)el.className=className;
  return el;
}
function button(text,action,className){
  const el=node('button',text,className);el.type='button';el.addEventListener('click',action);return el;
}
function swatch(p){
  const sample=node('div',undefined,'sample '+(p.look||''));
  if(p.tone)sample.style.setProperty('--tone',p.tone);
  if(p.image){
    sample.classList.add('real-sample');
    const img=node('img');img.src=p.image;img.alt=p.name+' catalogue preview';
    img.loading='lazy';img.width=300;img.height=200;
    img.addEventListener('error',()=>{img.hidden=true;sample.append(node('span','Preview unavailable — ask for a sample','image-error'));},{once:true});
    sample.append(img);
  }else sample.setAttribute('aria-hidden','true');
  return sample;
}
function add(id){
  if(!products.some(p=>p.id===id))return;
  shortlist.set(id,(shortlist.get(id)||0)+1);
  renderList();renderProducts();
  $('#collection-list').disabled=!shortlist.size;
}
function renderProducts(){
  const query=$('#search').value.toLowerCase().trim();
  const found=materials.filter(p=>(selectedCategory==='All'||p.category===selectedCategory)&&
    (p.name+' '+p.spec+' '+p.category).toLowerCase().includes(query));
  $('#products').replaceChildren();
  found.forEach(p=>{
    const card=node('article',undefined,'product');
    card.append(swatch(p),node('small',p.category.toUpperCase()),node('h3',p.name),node('p',p.spec));
    if(p.collection)card.append(button('Explore designs →',()=>openCollection(p.collection),'explore-designs'));
    card.append(button(shortlist.has(p.id)?'In your list ('+shortlist.get(p.id)+') · Add more +':
      p.collection?'Add category — choose design later +':'Add to my list +',()=>add(p.id)));
    $('#products').append(card);
  });
  $('#result-count').textContent=found.length+' material '+(found.length===1?'type':'types');
  $('#empty').hidden=found.length>0;
}
['All',...new Set(materials.map(p=>p.category))].forEach(c=>{
  const btn=button(c,()=>{selectedCategory=c;$$('#filters button').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));renderProducts();});
  btn.setAttribute('aria-pressed',String(c==='All'));$('#filters').append(btn);
});
$('#search').addEventListener('input',renderProducts);
bundles.forEach((b,i)=>{
  const card=node('article',undefined,'bundle');
  card.append(node('span','0'+(i+1)+' / ROOM CHECKLIST','bundle-number'),node('h3',b.name),node('p',b.description));
  const list=node('ul');b.items.forEach(id=>list.append(node('li',products.find(p=>p.id===id).name)));
  card.append(list,button('Customize this bundle →',()=>{
    b.items.forEach(id=>{if(!shortlist.has(id))shortlist.set(id,1);});
    renderList();renderProducts();$('#list-dialog').showModal();
  },'button'));$('#bundle-grid').append(card);
});
function listBrief(){
  return [...shortlist].map(([id,qty])=>{
    const p=products.find(p=>p.id===id);return p.name+': '+qty+' '+p.unit+' — '+p.spec;
  }).join('\n');
}
function renderList(){
  $('#count').textContent=shortlist.size;$('#list-items').replaceChildren();
  if(!shortlist.size)$('#list-items').append(node('p','Your list is empty. Browse materials or choose a room bundle.'));
  for(const [id,qty] of shortlist){
    const p=products.find(p=>p.id===id),row=node('div',undefined,'list-row'),title=node('div',p.name);
    title.append(node('small',p.spec));
    const label=node('label',p.unit),input=node('input');
    input.type='number';input.min='1';input.max='100000';input.step='1';input.value=qty;
    input.setAttribute('aria-label',p.name+' quantity in '+p.unit);
    input.addEventListener('change',()=>{const value=Math.max(1,Math.min(100000,Math.round(Number(input.value)||1)));shortlist.set(id,value);input.value=value;renderProducts();});
    label.append(input);
    const remove=button('×',()=>{shortlist.delete(id);renderList();renderProducts();});
    remove.setAttribute('aria-label','Remove '+p.name);row.append(title,label,remove);$('#list-items').append(row);
  }
  $('#quote-list').disabled=!shortlist.size;
}
$('#open-list').addEventListener('click',()=>$('#list-dialog').showModal());
$('#quote-list').addEventListener('click',()=>{$('#list-dialog').close();openEnquiry('Material list',listBrief());});
function openCollection(finish){
  collectionFinish=finish;designPage=0;$('#design-search').value='';$('#collection-feedback').textContent='';
  $('#collection-title').textContent=finish==='Plain Color'?'Solid colour laminates.':'Woodgrain laminates.';
  renderDesigns();$('#collection-dialog').showModal();
}
function renderDesigns(){
  const query=$('#design-search').value.toLowerCase().trim();
  const found=designs.filter(p=>p.finish===collectionFinish&&(p.name+' '+p.brand+' '+p.spec).toLowerCase().includes(query));
  const pages=Math.max(1,Math.ceil(found.length/PAGE_SIZE));designPage=Math.min(designPage,pages-1);
  $('#collection-designs').replaceChildren();
  found.slice(designPage*PAGE_SIZE,(designPage+1)*PAGE_SIZE).forEach(p=>{
    const card=node('article',undefined,'product');
    card.append(swatch(p),node('h3',p.name),node('p',p.finish),
      button('View design & source ↗',()=>{detailFromCollection=true;$('#collection-dialog').close();showDesign(p);}),
      button('Add design +',()=>{add(p.id);$('#collection-feedback').textContent=p.name+' added to your list.'}));
    $('#collection-designs').append(card);
  });
  $('#design-count').textContent=found.length?found.length+' designs · INSTER catalogue preview':'No matching designs. Try another code or ask Ratan.';
  $('#design-page').textContent=(designPage+1)+' / '+pages;
  $('#design-prev').disabled=designPage===0;$('#design-next').disabled=designPage>=pages-1;
  $('#collection-list').disabled=!shortlist.size;
}
$('#design-search').addEventListener('input',()=>{designPage=0;renderDesigns();});
$('#design-prev').addEventListener('click',()=>{designPage--;renderDesigns();});
$('#design-next').addEventListener('click',()=>{designPage++;renderDesigns();});
$('#collection-list').addEventListener('click',()=>{$('#collection-dialog').close();$('#list-dialog').showModal();});
function showDesign(p){
  const panel=$('#design-detail');panel.replaceChildren();
  panel.append(node('p',p.brand+' / CATALOGUE PREVIEW','eyebrow'),node('h2',p.name),swatch(p),node('p',p.spec),
    node('p','Size, thickness, stock and price are confirmed by Ratan. Printed sample dimensions are not sheet dimensions. Approve a physical sample before ordering.'));
  const source=node('a','View original catalogue spread ↗','text-link');
  source.href=p.sourceImage;source.target='_blank';source.rel='noopener noreferrer';
  panel.append(node('p','Source: INSTER-20-01-26.pdf · PDF page '+p.sourcePage),source,node('br'),
    button('Add this design to my list +',()=>{add(p.id);detailFromCollection=false;$('#design-dialog').close();$('#list-dialog').showModal();},'button'));
  $('#design-dialog').showModal();
}
$('#design-dialog').addEventListener('close',()=>{if(detailFromCollection){detailFromCollection=false;renderDesigns();$('#collection-dialog').showModal();}});
// One transport, distinct visible forms. Hidden fields preserve the established receiver contract.
const schemas={
  general:[['name','Your name','text',false],['phone','Mobile number','tel',true],['requirement','What do you need?','textarea',true]],
  list:[['name','Your name','text',true],['phone','Mobile number','tel',true]],
  supplier:[['business','Business name','text',true],['phone','Contact number','tel',true],['location','Business address','textarea',true],['requirement','What do you sell?','textarea',true]],
  bulk:[['name','Your name','text',true],['phone','Mobile number','tel',true],['business','Business / project name','text',false],['requirement','What materials do you need?','textarea',true],['quantity','Approximate quantity / project size','text',true],['location','Delivery city / area','text',true],['timeline','When do you need it?','text',false]]
};
function modeFor(kind){return kind==='Supplier application'?'supplier':kind==='Bulk sourcing'?'bulk':kind==='Material list'||kind==='Guided room plan'||kind==='Material guidance'?'list':'general';}
function openEnquiry(kind,brief=''){
  activeKind=kind;activeBrief=brief;submissionFingerprint='';
  const form=$('#enquiry-form');form.reset();$('#enquiry-fields').replaceChildren();
  const mode=modeFor(kind),summary=$('#enquiry-summary');
  $('#enquiry-title').textContent=mode==='supplier'?'Supply with Ratan.':mode==='bulk'?'Source in bulk.':mode==='list'?'Where should we call?':'Ask Ratan.';
  $('#enquiry-intro').textContent=mode==='list'?'Your requirement is ready. Just leave your name and mobile number.':mode==='supplier'?'Tell us about your business and supply range.':'Tell us what you need. We’ll call to discuss the details.';
  summary.replaceChildren();summary.hidden=mode!=='list';
  if(mode==='list'){
    summary.append(node('p','YOUR REQUIREMENT','eyebrow'),node('pre',brief));
    if(kind==='Material list')summary.append(button('Edit my list',()=>{$('#enquiry-dialog').close();$('#list-dialog').showModal();},'text-link'));
  }
  schemas[mode].forEach(([key,title,type,required])=>{
    const label=node('label',title+(required?' *':' (optional)'));
    const input=node(type==='textarea'?'textarea':'input');
    input.name='entry_'+key;input.required=required;
    input.maxLength=key==='requirement'?4000:key==='name'?100:150;
    if(type==='textarea'){input.rows=key==='location'?2:4;input.minLength=key==='requirement'?10:3;}
    else input.type=type;
    if(key==='phone'){input.pattern='[+0-9 ()-]{10,20}';input.maxLength=20;input.autocomplete='tel';input.inputMode='tel';}
    if(key==='name')input.autocomplete='name';
    if(key==='business')input.autocomplete='organization';
    if(key==='timeline')input.placeholder='e.g. Next month — leave blank if unsure';
    if(key==='requirement')input.placeholder=mode==='supplier'?'Materials, brands and categories you supply':'Materials, sizes or the project you have in mind';
    label.append(input);$('#enquiry-fields').append(label);
  });
  $('#form-status').textContent='';$('#enquiry-dialog').showModal();
}
$$('[data-enquiry]').forEach(b=>b.addEventListener('click',()=>openEnquiry(b.dataset.enquiry)));
$$('dialog .close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$('#privacy').addEventListener('click',()=>$('#privacy-dialog').showModal());
$('#menu').addEventListener('click',()=>{const open=$('#links').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));});
$('#links').addEventListener('click',()=>{$('#links').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');});
const planner=$('#planner');
planner.elements.room.addEventListener('change',()=>{
  const other=planner.elements.room.value==='Other';
  $('#other-room-label').hidden=!other;planner.elements.otherRoom.disabled=!other;planner.elements.otherRoom.required=other;
});
planner.addEventListener('submit',event=>{
  event.preventDefault();if(!planner.reportValidity())return;
  const d=new FormData(planner),room=d.get('room')==='Other'?String(d.get('otherRoom')).trim():d.get('room');
  const width=Number(d.get('width')),height=Number(d.get('height')),theme=d.get('theme');
  const paletteColours=theme==='Natural wood & warm colours'?['#b79167','#e5d7be','#798d73']:theme==='Dark & bold'?['#283b32','#c98668','#dfc795']:['#dddcd0','#99a997','#c0b5a1'];
  const panel=$('#plan');panel.replaceChildren();
  const palette=node('div',undefined,'palette');paletteColours.forEach(c=>{const swatch=node('i');swatch.style.background=c;palette.append(swatch);});
  const estimate=width>0&&height>0&&d.get('room')!=='Complete room'&&d.get('room')!=='Other'
    ?width+' × '+height+' ft = '+(width*height).toFixed(1)+' sq ft of one flat face. Approx. '+Math.ceil(width*height*1.15/32)+' 8×4 finish sheets for this face only, including 15% allowance. This does not estimate boards, shelves or a complete room.'
    :'We’ll clarify dimensions and the surfaces to be finished with you. No quantity estimate has been made.';
  const note='Confirm depth, layout, moisture exposure, sheet size, grain direction and a cutting plan with your carpenter before buying.';
  panel.append(palette,node('p',String(theme).toUpperCase(),'eyebrow'),node('h3',room),node('p',estimate),node('p',note),node('p',d.get('budget')+': compare suitable material options with Ratan.'));
  const brief='Room plan: '+room+'\nPreferred look: '+theme+'\nBudget preference: '+d.get('budget')+'\n'+estimate+'\n'+note;
  panel.append(button('Discuss this plan →',()=>openEnquiry('Guided room plan',brief),'button light'));
});
$('#help-choose').addEventListener('click',()=>$('#guide-dialog').showModal());
$('#material-guide').addEventListener('submit',e=>{
  e.preventDefault();const d=new FormData(e.currentTarget);
  const advice=d.get('use').includes('moisture')?'Discuss moisture exposure, edge sealing and a suitable water-resistant board with your carpenter. Laminate is not a substitute for waterproof construction.':'Discuss load, span, thickness and an appropriate interior board grade with your carpenter.';
  const brief='Material guidance\nUse: '+d.get('use')+'\nFinish: '+d.get('finish')+'\nPriority: '+d.get('priority')+'\nFinal grade, dimensions and quantity to confirm.';
  const panel=$('#guide-result');panel.replaceChildren(node('h3','Your starting point'),node('p',advice),node('p','Approve a physical sample. This is a rules-based guide, not an engineering specification.'));
  panel.append(button('Explore laminate designs →',()=>{$('#guide-dialog').close();openCollection(d.get('finish')==='Plain colour'?'Plain Color':'Suede Finish');},'button'),
    button('Discuss this brief →',()=>{$('#guide-dialog').close();openEnquiry('Material guidance',brief);},'text-link'));
});
const enquiryForm=$('#enquiry-form');
enquiryForm.addEventListener('submit',event=>{
  if(!enquiryForm.checkValidity()){event.preventDefault();enquiryForm.reportValidity();return;}
  const endpoint=window.RATAN_CONFIG?.enquiryEndpoint;
  if(!endpoint||enquiryForm.elements.website.value){event.preventDefault();$('#form-status').textContent='Submission unavailable. Please call or WhatsApp Ratan.';return;}
  const read=k=>enquiryForm.elements['entry_'+k]?.value.trim()||'';
  const mode=modeFor(activeKind),data={
    name:mode==='supplier'?read('business'):read('name')||'Not provided',
    phone:read('phone'),business:read('business'),
    location:read('location')||'To confirm — not provided',quantity:read('quantity'),timeline:read('timeline'),
    kind:activeKind,source:'Ratan website / '+activeKind
  };
  const raw=mode==='list'?activeBrief:read('requirement');
  const context=mode==='general'&&shortlist.size?'\nCurrent shortlist:\n'+listBrief():'';
  data.requirement='Enquiry type: '+activeKind+'\n'+raw+context+
    (data.business?'\nBusiness: '+data.business:'')+
    (data.timeline?'\nTiming (optional): '+data.timeline:'')+'\nConsent to contact: yes';
  if(data.requirement.length>5000){event.preventDefault();$('#form-status').textContent='Your list is too long for one enquiry. Please split it into smaller lists.';return;}
  const fingerprint=JSON.stringify(data);
  if(fingerprint!==submissionFingerprint){enquiryForm.elements.requestId.value=crypto.randomUUID?crypto.randomUUID():'ratan-'+Date.now()+'-'+Math.random().toString(36).slice(2);submissionFingerprint=fingerprint;}
  Object.entries(data).forEach(([k,v])=>{enquiryForm.elements[k].value=v;});
  enquiryForm.action=endpoint;
  $('#form-status').textContent='Opening your receipt. Check that tab for confirmation. If Google asks you to sign in or refuses access, please call or WhatsApp Ratan.';
});
renderProducts();renderList();
