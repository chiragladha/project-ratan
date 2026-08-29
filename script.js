const prompt=document.querySelector('#project-prompt'),panel=document.querySelector('#prompt-panel'),results=document.querySelector('#results'),scope=document.querySelector('#scope');
document.querySelectorAll('[data-focus]').forEach(x=>x.addEventListener('click',e=>{e.preventDefault();document.querySelector('#workspace').scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>prompt.focus(),500)}));
const examples={'Kitchen cabinets':'I want to build modular kitchen cabinets. Help me plan the boards, finishes and hardware for a durable, mid-range kitchen.','Bedroom wardrobe':'I need a modern 8-foot bedroom wardrobe with internal drawers, a light wood finish and durable hardware.','TV unit':'I want to build a warm, modern TV unit and storage wall for my living room. Around 9 feet wide, walnut finish, mid-range budget.','Full BOQ':'I have a complete interior project. Help me turn my rooms and measurements into a materials requirement list and supplier quote comparison.'};
document.querySelectorAll('.prompt-chips button').forEach(x=>x.addEventListener('click',()=>{prompt.value=examples[x.textContent];prompt.focus()}));
scope.addEventListener('click',()=>{if(!prompt.value.trim()){prompt.focus();return}scope.innerHTML='Scoping your brief <i>✦</i>';scope.disabled=true;setTimeout(()=>{panel.hidden=true;results.hidden=false},650)});
document.querySelector('#restart').addEventListener('click',()=>{results.hidden=true;panel.hidden=false;scope.disabled=false;scope.innerHTML='Scope my project <i>→</i>';prompt.focus()});

const enquiryDialog = document.querySelector('#enquiry-dialog');
const enquiryForm = document.querySelector('#enquiry-form');
const formStatus = document.querySelector('#form-status');
document.querySelectorAll('[data-open-enquiry]').forEach((button) => button.addEventListener('click', () => enquiryDialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click', () => enquiryDialog.close());
enquiryDialog.addEventListener('click', (event) => { if (event.target === enquiryDialog) enquiryDialog.close(); });
enquiryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const endpoint = window.RATAN_CONFIG?.enquiryEndpoint;
  const submitButton = enquiryForm.querySelector('[type="submit"]');
  if (!endpoint) {
    formStatus.textContent = 'The enquiry receiver is being connected. Please try again shortly.';
    return;
  }
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending your enquiry <i>✦</i>';
  const payload = new URLSearchParams(new FormData(enquiryForm));
  payload.set('source', 'Ratan website');
  try {
    await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: payload });
    enquiryForm.reset();
    formStatus.textContent = 'Thank you — your enquiry is with Ratan. We’ll call you right back.';
  } catch (error) {
    formStatus.textContent = 'We could not send that just now. Please try again in a moment.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Submit enquiry <i>→</i>';
  }
});
