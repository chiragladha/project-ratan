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
  // The floating shortcut must never sit on top of the direct contact actions.
  const contact=document.getElementById('contact'),floating=document.querySelector('.ask-ratan');
  if(contact&&floating&&'IntersectionObserver' in window)new IntersectionObserver(entries=>{floating.hidden=entries[0].isIntersecting;},{threshold:0}).observe(contact);
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
  const whatsapp='<svg class="ui-icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.93 11.93 0 0 0 5.77 1.47h.01C18.62 23.83 24 18.48 24 11.9c0-3.19-1.24-6.18-3.48-8.42ZM12.04 21.8a9.87 9.87 0 0 1-5.03-1.37l-.36-.21-3.72.98.99-3.63-.24-.38a9.87 9.87 0 0 1-1.52-5.25c0-5.47 4.45-9.93 9.93-9.93a9.83 9.83 0 0 1 7.02 2.91 9.83 9.83 0 0 1 2.91 7.02c0 5.48-4.46 9.86-9.98 9.86Zm5.45-7.39c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.68-.51h-.57c-.2 0-.53.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.11 3.22 5.12 4.52.71.31 1.27.5 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>';
  function icons(root){root.querySelectorAll('a,button,h3').forEach(el=>{
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())if(/[→↗←↓]/.test(walker.currentNode.textContent))nodes.push(walker.currentNode);
    nodes.forEach(n=>{const span=document.createElement('span');span.className='arrow-icon';if(n.textContent.includes('←'))span.classList.add('back');span.innerHTML=arrow;n.textContent=n.textContent.replace(/[→↗←↓]/g,'');n.after(span);});
    if(/WhatsApp/i.test(el.textContent)&&!el.querySelector('.wa-icon')){const span=document.createElement('span');span.className='wa-icon';span.innerHTML=whatsapp;el.prepend(span);}
  });}
  icons(document);new MutationObserver(records=>{if(records.some(r=>r.addedNodes.length))icons(document);}).observe(document.body,{childList:true,subtree:true});
});
