/* Deploy an updated version of the existing Web App (execute as Me; access Anyone).
   Keep the spreadsheet sharing Restricted. This endpoint only accepts enquiries;
   it never serves spreadsheet contents. See SETUP.md before publishing. */
const SHEET_ID = '1_qviXYk4F8UlkAKpKfn9JCDQfLzEEnuyq493CtMPVMw';
const HEADERS = ['Received at','Name','Phone','Requirement','Quantity / project size','Location','Source','Lead ID','Type','Business','Timeline','Consent','Status','Owner','Next follow-up','Notes'];
function doGet(){return receipt_('Ratan enquiry desk','Please submit an enquiry through the Ratan website.');}
function doPost(event){
  const p=(event&&event.parameter)||{};
  const lock=LockService.getScriptLock();
  try{
    if(p.website)throw new Error('Please return to the form and try again.');
    const limits={name:100,phone:20,requirement:5000,quantity:150,location:150,source:100,kind:60,business:150,timeline:100,requestId:100};
    const d={};Object.keys(limits).forEach(k=>{d[k]=String(p[k]||'').trim();if(d[k].length>limits[k])throw new Error('One of the fields is too long. Please shorten it.');});
    if(!d.name||d.requirement.length<10||!d.location||!/^\+?[0-9 ()-]{10,20}$/.test(d.phone)||d.phone.replace(/\D/g,'').length<10||p.consent!=='yes')throw new Error('Please provide a name, valid phone number, location, requirement and contact consent.');
    if(!/^[a-zA-Z0-9-]{10,100}$/.test(d.requestId))throw new Error('Please submit again from the current website.');
    if(d.kind==='Supplier application'&&!d.business)throw new Error('Please include your business name.');
    lock.waitLock(10000);
    const book=SpreadsheetApp.openById(SHEET_ID);
    let sheet=book.getSheetByName('Enquiries');
    if(!sheet)sheet=book.insertSheet('Enquiries');
    if(sheet.getLastRow()===0){sheet.appendRow(HEADERS);sheet.setFrozenRows(1);}
    else{
      const existing=sheet.getRange(1,1,1,7).getValues()[0];
      if(existing.some((v,i)=>v!==HEADERS[i]))throw new Error('The enquiry desk needs a configuration update. Please try later.');
      sheet.getRange(1,8,1,HEADERS.length-7).setValues([HEADERS.slice(7)]);
    }
    const last=sheet.getLastRow();
    if(last>1&&sheet.getRange(2,8,last-1,1).createTextFinder(d.requestId).matchEntireCell(true).findNext())return receipt_('Enquiry already received','Your enquiry is already saved. Ratan will follow up.',d.requestId);
    const cache=CacheService.getScriptCache();
    const key='lead-'+d.phone.replace(/\D/g,'');
    if(cache.get(key))throw new Error('An enquiry for this number was received recently. Please wait a minute before sending another.');
    // Prefix untrusted values so Google Sheets cannot execute them as formulas.
    const text=v=>"'"+String(v||'');
    sheet.appendRow([new Date(),text(d.name),text(d.phone),text(d.requirement),text(d.quantity),text(d.location),text(d.source),d.requestId,text(d.kind),text(d.business),text(d.timeline),'yes','New','','','']);
    SpreadsheetApp.flush();cache.put(key,'1',60);
    return receipt_('Enquiry received','Your enquiry has been saved. The Ratan team will contact you to discuss your requirement.',d.requestId);
  }catch(error){
    const known=/^(Please |One of |The enquiry desk |An enquiry )/.test(error.message);
    return receipt_('Enquiry not confirmed',known?error.message:'We could not confirm your enquiry. Please return to the website and try again.');
  }finally{if(lock.hasLock())lock.releaseLock();}
}
function receipt_(title,message,id){
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  return HtmlService.createHtmlOutput('<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ratan enquiry</title><body style="background:#f6f3ec;color:#152b23;font:16px/1.7 system-ui;padding:32px;max-width:600px;margin:40px auto"><p>RATAN ENTERPRISES · AHMEDABAD</p><h1>'+escape(title)+'</h1><p>'+escape(message)+'</p>'+(id?'<p>Reference: '+escape(id)+'</p>':'')+'<p>You can close this tab and return to Ratan.</p></body>');
}
