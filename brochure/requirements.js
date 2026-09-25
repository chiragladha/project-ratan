'use strict';
(function(root){
  // Never throw away free text. Older enquiries are review tasks, not invented BOQs.
  function parseRequirement(brief){
    const lines=String(brief||'').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    const source=lines.length?lines:['Confirm the customer requirement'];
    if(source.length>100)throw Error('More than 100 requirement lines. Split this enquiry before importing; nothing has been discarded.');
    return source.map((raw,i)=>{const m=raw.match(/^(.+?):\s*(\d+(?:\.\d+)?)\s+(.+?)(?:\s+[—–-]\s+(.+))?$/);return{requestKey:'request-'+(i+1),requestedText:raw,name:m?m[1]:raw,spec:m?m[4]||'Confirm full specification':'Clarify this requirement before quoting',quantity:m?Number(m[2]):'',unit:m?m[3]:'',price:'',tax:'',shipping:'',eta:'To confirm',image:'',needsReview:!m};});
  }
  function fromEnquiry(d){if(!d||typeof d!=='object'||!d.reference)throw Error('This enquiry has no reference.');const options=Array.isArray(d.options)&&d.options.length?d.options:parseRequirement(d.brief);if(options.length>100)throw Error('More than 100 items; import stopped without truncation.');const brief=String(d.brief||'')+(d.quantityNote?'\nQuantity / project size supplied: '+d.quantityNote:'')+(d.kind?'\nEnquiry type: '+d.kind:'');return{...d,brief,mode:'items',options};}
  root.RatanRequirements={parseRequirement,fromEnquiry};if(typeof module!=='undefined')module.exports=root.RatanRequirements;
})(typeof window==='undefined'?globalThis:window);
