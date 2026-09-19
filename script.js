'use strict';
const products = [
  {id:'ply',name:'Plywood & boards',category:'Boards',spec:'MR, BWR, BWP · thickness to confirm',unit:'sheets',look:'wood'},
  {id:'mdf',name:'MDF / HDHMR boards',category:'Boards',spec:'For cabinetry and interior applications',unit:'sheets',look:'wood'},
  {id:'wood',name:'Woodgrain laminate',category:'Laminates',spec:'Oak, walnut & teak looks · sample approval',unit:'sheets',look:'wood'},
  {id:'solid',name:'Solid colour laminate',category:'Laminates',spec:'Matte or gloss · colour to confirm',unit:'sheets',tone:'#93a58c'},
  {id:'hinge',name:'Hinges & drawer channels',category:'Hardware',spec:'Opening type, load & dimensions to confirm',unit:'sets',look:'hardware'},
  {id:'screw',name:'Screws, nuts & bolts',category:'Hardware',spec:'Sizes and finish matched to your application',unit:'packs',look:'hardware'},
  {id:'adhesive',name:'Adhesives & edge bands',category:'Hardware',spec:'Matched to your board and surface',unit:'sets',tone:'#b2ad81'},
  {id:'light',name:'Decorative & task lights',category:'Electrical',spec:'Pendant, wall & task lighting on request',unit:'pieces',look:'lights'},
  {id:'fan',name:'Ceiling fans',category:'Electrical',spec:'Sweep, controls and finish to confirm',unit:'pieces',tone:'#b6bdb1'},
  {id:'switch',name:'Switches & electrical items',category:'Electrical',spec:'Switch plates, sockets & accessories',unit:'sets',look:'hardware'},
  {id:'paint',name:'Interior paints',category:'Wall finishes',spec:'Colour, coverage and wall preparation to confirm',unit:'litres',tone:'#d89b80'},
  {id:'wallpaper',name:'Wallpaper & digital prints',category:'Wall finishes',spec:'Custom wall dimensions · artwork approval',unit:'sq ft',look:'walls'}
];
const bundles = [
  {name:'The wardrobe edit',description:'Boards + laminate + fittings',items:['ply','wood','hinge','adhesive']},
  {name:'The living room layer',description:'Surfaces + walls + lighting',items:['ply','solid','light','wallpaper']},
  {name:'The room refresh',description:'Colour + comfort + details',items:['paint','fan','switch','light']}
];
const $ = s => document.querySelector(s);
const shortlist = new Map();
let selectedCategory = 'All';
function node(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function add(id){shortlist.set(id,(shortlist.get(id)||0)+1);renderList();renderProducts();}
function renderProducts(){
  const query=$('#search').value.toLowerCase().trim();
  const found=products.filter(p=>(selectedCategory==='All'||p.category===selectedCategory)&&`${p.name} ${p.spec}`.toLowerCase().includes(query));
  $('#products').replaceChildren();
  found.forEach(p=>{const card=node('article',undefined,'product');const sample=node('div',undefined,`sample ${p.look||''}`);if(p.tone)sample.style.setProperty('--tone',p.tone);sample.setAttribute('aria-hidden','true');card.append(sample,node('small',p.category.toUpperCase()),node('h3',p.name),node('p',p.spec));const btn=node('button',shortlist.has(p.id)?`In your list (${shortlist.get(p.id)}) · Add more +`:'Add to sourcing list +');btn.addEventListener('click',()=>add(p.id));card.append(btn);$('#products').append(card);});
  $('#result-count').textContent=`${found.length} material options`;
  $('#empty').hidden=found.length>0;
}
['All',...new Set(products.map(p=>p.category))].forEach(c=>{const btn=node('button',c);btn.setAttribute('aria-pressed',String(c==='All'));btn.addEventListener('click',()=>{selectedCategory=c;$('#filters').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));renderProducts();});$('#filters').append(btn);});
$('#search').addEventListener('input',renderProducts);
bundles.forEach((b,i)=>{const card=node('article',undefined,'bundle');card.append(node('span',`0${i+1} / ROOM CHECKLIST`,'bundle-number'),node('h3',b.name),node('p',b.description));const list=node('ul');b.items.forEach(id=>list.append(node('li',products.find(p=>p.id===id).name)));const btn=node('button','Customize this bundle →','button');btn.addEventListener('click',()=>{b.items.forEach(id=>{if(!shortlist.has(id))shortlist.set(id,1);});renderList();renderProducts();$('#list-dialog').showModal();});card.append(list,btn);$('#bundle-grid').append(card);});
function renderList(){
  $('#count').textContent=shortlist.size;
  $('#list-items').replaceChildren();
  if(!shortlist.size)$('#list-items').append(node('p','Your list is empty. Browse materials or choose a room bundle.'));
  for(const [id,qty] of shortlist){const p=products.find(p=>p.id===id);const row=node('div',undefined,'list-row');const title=node('div',p.name);title.append(node('small',p.spec));const label=node('label',p.unit);const input=node('input');input.type='number';input.min='1';input.max='100000';input.step='1';input.value=qty;input.setAttribute('aria-label',`${p.name} quantity in ${p.unit}`);input.addEventListener('change',()=>{const value=Math.max(1,Math.min(100000,Math.round(Number(input.value)||1)));shortlist.set(id,value);input.value=value;renderProducts();});label.append(input);const remove=node('button','×');remove.setAttribute('aria-label',`Remove ${p.name}`);remove.addEventListener('click',()=>{shortlist.delete(id);renderList();renderProducts();});row.append(title,label,remove);$('#list-items').append(row);}
  $('#quote-list').disabled=!shortlist.size;
}
$('#open-list').addEventListener('click',()=>$('#list-dialog').showModal());
$('#quote-list').addEventListener('click',()=>{const brief=[...shortlist].map(([id,q])=>{const p=products.find(p=>p.id===id);return `${p.name}: ${q} ${p.unit} (specification to confirm)`;}).join('\n');$('#list-dialog').close();openEnquiry('Material list',brief);});
function openEnquiry(kind,brief=''){
  const form=$('#enquiry-form');form.elements.kind.value=kind;form.elements.requirement.value=brief;$('#business-label').hidden=kind!=='Supplier application';form.elements.business.required=kind==='Supplier application';$('#enquiry-title').textContent=kind==='Supplier application'?'Supply with Ratan.':'Let’s source it.';$('#form-status').textContent='';$('#enquiry-dialog').showModal();
}
document.querySelectorAll('[data-enquiry]').forEach(b=>b.addEventListener('click',()=>openEnquiry(b.dataset.enquiry)));
document.querySelectorAll('dialog .close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$('#privacy').addEventListener('click',()=>$('#privacy-dialog').showModal());
$('#menu').addEventListener('click',()=>{const open=$('#links').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));});
$('#links').addEventListener('click',()=>{$('#links').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');});
$('#planner').addEventListener('submit',event=>{
  event.preventDefault();const d=new FormData(event.currentTarget),width=Number(d.get('width')),height=Number(d.get('height'));const area=width*height,sheets=Math.ceil(area*1.15/32);const theme=d.get('theme');const colours=theme==='Warm natural'?['#b79167','#e5d7be','#798d73']:theme==='Calm contemporary'?['#dddcd0','#99a997','#c0b5a1']:['#283b32','#c98668','#dfc795'];
  const panel=$('#plan');panel.replaceChildren();const palette=node('div',undefined,'palette');colours.forEach(c=>{const swatch=node('i');swatch.style.background=c;palette.append(swatch);});panel.append(palette,node('p',String(theme).toUpperCase(),'eyebrow'),node('h3',String(d.get('room'))),node('p',`${width} × ${height} ft = ${area.toFixed(1)} sq ft of front face. Approx. ${sheets} 8×4 finish sheets for this face only, including 15% allowance. Grain direction, cuts and sheet sizes can change this estimate.`),node('p','Carcass boards, shelves, backs, internal finishes and fittings require depth, layout and a carpenter’s cutting plan. This is not a complete bill of materials.'),node('p',`${d.get('budget')}: ask Ratan to compare suitable board grades and finish options within your budget.`));
  const brief=`Guided room plan: ${d.get('room')}\nTheme: ${theme}\nFront dimensions: ${width} × ${height} ft\nBudget direction: ${d.get('budget')}\nIndicative front finish: ${sheets} 8×4 sheets, with 15% allowance. NOT a full BOQ. Depth, compartments, board grade, hardware and final cutting plan need confirmation.`;
  const btn=node('button','Discuss this plan with Ratan →','button light');btn.addEventListener('click',()=>openEnquiry('Guided room plan',brief));panel.append(btn);
});
const enquiryForm=$('#enquiry-form');
enquiryForm.addEventListener('submit',event=>{
  const endpoint=window.RATAN_CONFIG?.enquiryEndpoint;
  if(!endpoint||enquiryForm.elements.website.value){event.preventDefault();$('#form-status').textContent='Submission unavailable. Please try again.';return;}
  enquiryForm.action=endpoint;
  enquiryForm.elements.requestId.value=crypto.randomUUID?crypto.randomUUID():`ratan-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  $('#form-status').textContent='Opening your submission receipt. Check that tab for confirmation; your details remain here if you need to retry.';
});
renderProducts();renderList();
