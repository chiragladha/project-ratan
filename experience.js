'use strict';
// Shared, dependency-free interface helpers. No customer data is persisted here.
window.RatanExperience={
  attachPhone(input,label){
    const select=document.createElement('select');select.name='entry_country';select.setAttribute('aria-label','Country calling code');
    const countries=[['India','91',10,10],['United States / Canada','1',10,10],['United Kingdom','44',10,10],['United Arab Emirates','971',9,9],['Australia','61',9,9],['Singapore','65',8,8],['New Zealand','64',8,10],['Saudi Arabia','966',9,9],['Qatar','974',8,8],['Germany','49',7,13],['France','33',9,9],['South Africa','27',9,9],['Other country','',6,14]];
    countries.forEach(([name,code])=>{const o=document.createElement('option');o.value=code;o.textContent=name+(code?' (+'+code+')':'');select.append(o);});
    const custom=document.createElement('input');custom.name='entry_dial';custom.type='tel';custom.inputMode='numeric';custom.maxLength=3;custom.pattern='[1-9][0-9]{0,2}';custom.placeholder='Code, e.g. 81';custom.setAttribute('aria-label','Other country calling code');custom.hidden=true;custom.disabled=true;
    const group=document.createElement('div');group.className='phone-fields';input.before(group);group.append(select,custom,input);
    const note=document.createElement('small');note.textContent='Enter the national number without the country code or leading 0.';label.append(note);
    function rules(){const c=countries[select.selectedIndex];custom.hidden=custom.disabled=!!select.value;custom.required=!select.value;const code=select.value||custom.value;input.maxLength=Math.min(c[3],15-code.length);input.minLength=c[2];input.pattern=select.value==='91'?'[6-9][0-9]{9}':'[1-9][0-9]{'+(c[2]-1)+','+(input.maxLength-1)+'}';input.placeholder=select.value==='91'?'10-digit mobile number':'National phone number';input.setCustomValidity('');}
    input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(0,input.maxLength);});
    custom.addEventListener('input',()=>{custom.value=custom.value.replace(/\D/g,'');rules();});select.addEventListener('change',rules);rules();
  },
  phoneValue(form){return '+'+(form.elements.entry_country.value||form.elements.entry_dial.value)+form.elements.entry_phone.value;},
  confirm(reference){
    document.getElementById('enquiry-dialog').close();
    let dialog=document.getElementById('received-dialog');
    if(!dialog){dialog=document.createElement('dialog');dialog.id='received-dialog';dialog.setAttribute('aria-labelledby','received-title');dialog.innerHTML='<p class="eyebrow">A NEW IDEA, IN GOOD HANDS</p><h2 id="received-title">Your enquiry<br><em>has been received.</em></h2><p>Your Ratan reference</p><strong class="ticket"></strong><p>Keep this reference handy. Our sourcing desk will call to understand the details.</p><button class="button" type="button">Back to exploring</button>';dialog.querySelector('button').onclick=()=>dialog.close();document.body.append(dialog);}
    dialog.querySelector('.ticket').textContent=reference;dialog.showModal();
  }
};
document.addEventListener('DOMContentLoaded',()=>{
  // Native disclosures keep every section addressable without a long initial scroll.
  document.querySelector('section.split').id='business';document.querySelector('section.faq').id='questions';
  const sections=[['bundles','Room bundles','A checklist for your space'],['catalogue','Material library','Browse categories and explore designs'],['studio','Plan your space','A guided starting point'],['about','Why Ratan','How our sourcing desk works'],['business','For businesses','Bulk sourcing & supply partnerships'],['questions','Questions, answered','Buying, delivery & privacy']];
  sections.forEach(([id,title,description])=>{const section=document.getElementById(id);const detail=document.createElement('details');detail.className='section-drawer';const summary=document.createElement('summary');const strong=document.createElement('strong');strong.textContent=title;const small=document.createElement('span');small.textContent=description;summary.append(strong,small);section.before(detail);detail.append(summary,section);});
  function reveal(hash){const target=document.getElementById(hash.replace('#',''));if(!target)return;const drawer=target.closest('.section-drawer');if(drawer)drawer.open=true;requestAnimationFrame(()=>target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}));}
  document.addEventListener('click',event=>{const link=event.target.closest('a[href^="#"]');if(link&&link.hash)reveal(link.hash);});
  window.addEventListener('hashchange',()=>reveal(location.hash));if(location.hash)reveal(location.hash);
  const links=document.getElementById('links');const menu=document.createElement('details');menu.className='explore-menu';menu.innerHTML='<summary>Explore Ratan</summary><div><a href="#catalogue">Materials & designs</a><a href="#bundles">Room bundles</a><a href="#studio">Planning guide</a><a href="#about">Why Ratan</a><a href="#business">Bulk & suppliers</a><a href="#questions">FAQs</a></div>';links.prepend(menu);
  menu.addEventListener('click',event=>{if(event.target.closest('a'))menu.open=false;});
  const arrow='<svg class="ui-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  const whatsapp='<svg class="ui-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 11.7a8 8 0 0 1-11.9 7L3 20l1.3-4.9A8 8 0 1 1 20 11.7Z"/><path d="M8 7.5c-.8 1.3 0 3.4 1.8 5.2s3.9 2.6 5.2 1.8l1-1.4-2.6-1.2-.9.8a8 8 0 0 1-2.2-2.2l.8-.9L10 7Z"/></svg>';
  function icons(root){root.querySelectorAll('a,button,h3').forEach(el=>{
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())if(/[→↗←↓]/.test(walker.currentNode.textContent))nodes.push(walker.currentNode);
    nodes.forEach(n=>{const span=document.createElement('span');span.className='arrow-icon';if(n.textContent.includes('←'))span.classList.add('back');span.innerHTML=arrow;n.textContent=n.textContent.replace(/[→↗←↓]/g,'');n.after(span);});
    if(/WhatsApp/i.test(el.textContent)&&!el.querySelector('.wa-icon')){const span=document.createElement('span');span.className='wa-icon';span.innerHTML=whatsapp;el.prepend(span);}
  });}
  icons(document);new MutationObserver(records=>{if(records.some(r=>r.addedNodes.length))icons(document);}).observe(document.body,{childList:true,subtree:true});
});
